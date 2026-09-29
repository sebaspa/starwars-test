'use client'

import { useMemo, useRef, useState } from 'react'
import { Button, TableProps } from 'antd'
import { DataTableType } from '../CharacterTable.types'
import { useQuery } from '@apollo/client/react'
import { GET_CHARACTERS } from '@/app/graphql/queries'
import usePagination from '@/app/hooks/usePagination'

const PAGE_SIZE = 10

const useCharacterTable = () => {
  const columns: TableProps<DataTableType>['columns'] = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Birth Year', dataIndex: 'birthYear', key: 'birthYear' },
    {
      title: 'Detail',
      key: 'btnDetail',
      width: 110,
      render: (_, record) => (
        <Button
          type='primary'
          size='small'
          onClick={() => {
            console.log('Detail clicked for', record)
          }}
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
    fetchMore
  }
}

export default useCharacterTable
