'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, TableProps } from 'antd'
import { DataTableType } from '../CharacterTable.types'
import { useLazyQuery, useQuery } from '@apollo/client/react'
import { GET_CHARACTERS, GET_CHARACTER_DETAIL } from '@/app/graphql/queries'
import usePagination from '@/app/hooks/usePagination'

const PAGE_SIZE = 10
const CHARACTER_PARAM = 'character'

const useCharacterTable = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const characterIdFromUrl = searchParams.get(CHARACTER_PARAM)
  const isModalOpen = Boolean(characterIdFromUrl)

  const [
    getCharacterDetail,
    { data: detailData, loading: detailLoading, error: detailError }
  ] = useLazyQuery(GET_CHARACTER_DETAIL)

  useEffect(() => {
    if (characterIdFromUrl) {
      getCharacterDetail({ variables: { id: characterIdFromUrl } })
    }
  }, [characterIdFromUrl, getCharacterDetail])

  const handleOpenDetail = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(CHARACTER_PARAM, id)
      router.push(`/?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  const handleClose = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(CHARACTER_PARAM)
    const qs = params.toString()
    router.push(qs ? `/?${qs}` : '/', { scroll: false })
  }, [router, searchParams])

  const columns: TableProps<DataTableType>['columns'] = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender', responsive: ['md'] },
    {
      title: 'Birth Year',
      dataIndex: 'birthYear',
      key: 'birthYear',
      responsive: ['md']
    },
    {
      title: 'Detail',
      key: 'btnDetail',
      width: 110,
      render: (_, record) => (
        <Button
          type='primary'
          size='small'
          onClick={() => handleOpenDetail(record.id)}
        >
          Open detail
        </Button>
      )
    }
  ]

  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { first: PAGE_SIZE, after: null },
    notifyOnNetworkStatusChange: true
  })

  const cursorMapRef = useRef<Map<number, string | null>>(new Map([[1, null]]))

  const rows: DataTableType[] = useMemo(
    () =>
      data?.allPeople?.people?.map(person => ({
        id: person.id,
        name: person.name,
        gender: person.gender ?? 'unknown',
        birthYear: person.birthYear ?? 'unknown',
        btnDetail: ''
      })) ?? [],
    [data]
  )

  const [paginatingLoading, setPaginatingLoading] = useState(false)
  const displayRows: DataTableType[] = paginatingLoading ? [] : rows

  const computeSafeTotal = ({
    page
  }: {
    page: number
    pageSize: number
  }): number | undefined => {
    if (!data?.allPeople) return undefined
    const hasNext = data.allPeople.pageInfo.hasNextPage
    const totalCount = data.allPeople.totalCount
    if (hasNext) return totalCount
    return (page - 1) * PAGE_SIZE + rows.length
  }

  const initializedRef = useRef(false)

  const { pagination } = usePagination({
    initialPage: 1,
    initialPageSize: PAGE_SIZE,
    getTotal: computeSafeTotal,
    onFetch: ({ page, pageSize: nextPageSize }) => {
      const cursorMap = cursorMapRef.current
      const after = cursorMap.get(page) ?? null
      setPaginatingLoading(true)
      return fetchMore({
        variables: { first: nextPageSize, after },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          if (!initializedRef.current) {
            cursorMap.set(
              2,
              fetchMoreResult.allPeople.pageInfo.endCursor ?? null
            )
            initializedRef.current = true
          }
          cursorMap.set(
            page + 1,
            fetchMoreResult.allPeople.pageInfo.endCursor ?? null
          )
          return fetchMoreResult
        }
      }).finally(() => {
        setPaginatingLoading(false)
      })
    }
  })

  return {
    columns,
    data: displayRows,
    loading,
    error,
    pagination,
    fetchMore,
    isModalOpen,
    handleClose,
    detailData: detailData?.person ?? null,
    detailLoading,
    detailError
  }
}

export default useCharacterTable
