export type UsePaginationParams = {
  initialPage?: number
  initialPageSize?: number
  total?: number
  onFetch?: (params: {
    page: number
    pageSize: number
  }) => unknown | Promise<unknown>
  getTotal?: (params: { page: number; pageSize: number }) => number | undefined
}

export type UsePaginationResult = {
  current: number
  pageSize: number
  total: number
  loading: boolean
  pagination: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize: number) => void
    showSizeChanger: boolean
    showTotal: (total: number, range: [number, number]) => string
  }
  handlePaginationChange: (page: number, pageSize: number) => void
  setTotal: (total: number) => void
  setLoading: (loading: boolean) => void
}
