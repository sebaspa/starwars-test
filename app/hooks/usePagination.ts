'use client'

import { useCallback, useMemo, useState } from 'react'
import { UsePaginationParams, UsePaginationResult } from '../types/usePagination.types'

const usePagination = ({
  initialPage = 1,
  initialPageSize = 10,
  total: initialTotal = 0,
  onFetch,
  getTotal
}: UsePaginationParams = {}): UsePaginationResult => {
  const [current, setCurrent] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [loading, setLoading] = useState(false)
  const [storedTotal, setStoredTotal] = useState(initialTotal)
  const derivedTotal = useMemo<number>(() => {
    if (!getTotal) return storedTotal
    const next = getTotal({ page: current, pageSize })
    return typeof next === 'number' ? next : storedTotal
  }, [getTotal, current, pageSize, storedTotal])

  const handlePaginationChange = useCallback(
    (page: number, nextPageSize: number) => {
      setCurrent(page)
      setPageSize(nextPageSize)
      if (onFetch) {
        setLoading(true)
        Promise.resolve(onFetch({ page, pageSize: nextPageSize })).finally(() =>
          setLoading(false)
        )
      }
      if (getTotal) {
        const next = getTotal({ page, pageSize: nextPageSize })
        if (typeof next === 'number') setStoredTotal(next)
      }
    },
    [onFetch, getTotal]
  )


  const pagination = {
    current,
    pageSize,
    total: derivedTotal,
    onChange: handlePaginationChange,
    showSizeChanger: true,
    showTotal: (t: number, range: [number, number]) =>
      `${range[0]}-${range[1]} de ${t}`
  }

  return {
    current,
    pageSize,
    total: derivedTotal,
    loading,
    pagination,
    handlePaginationChange,
    setTotal: setStoredTotal,
    setLoading
  }
}

export default usePagination
