'use client'

import { Table } from "antd"
import useCharacterTable from "./hooks/useCharacterTable"
import type { DataTableType } from "./CharacterTable.types"

const CharacterTable = () => {
  const { columns, data, loading, error } = useCharacterTable()
  const dataSource: DataTableType[] = data ?? []

  if (error) {
    return <p>Error loading characters: {error.message}</p>
  }

  return (
    <Table<DataTableType>
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey="id"
    />
  )
}

export default CharacterTable
