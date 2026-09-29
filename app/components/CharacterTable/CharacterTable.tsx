'use client'

import { Table, Space } from 'antd'
import useCharacterTable from './hooks/useCharacterTable'
import type { DataTableType } from './CharacterTable.types'
import ModalCharacterDetail from '../ModalCharacterDetail/ModalCharacterDetail'
import { useIsMounted } from '@/app/hooks/useIsMounted'

const CharacterTable = () => {
  const {
    columns,
    data,
    loading,
    error,
    pagination,
    isModalOpen,
    handleClose,
    detailData,
    detailLoading,
    detailError
  } = useCharacterTable()


  const mounted = useIsMounted()

  const dataSource: DataTableType[] = data ?? []

  if (error) {
    return <p>Error loading characters: {error.message}</p>
  }

  return (
    <Space orientation='vertical' size='middle' style={{ width: '100%' }}>
      <Table<DataTableType>
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey='id'
        pagination={pagination}
      />
      {mounted && (
        <ModalCharacterDetail
          isModalOpen={isModalOpen}
          handleClose={handleClose}
          loading={detailLoading}
          error={detailError}
          data={detailData}
        />
      )}
    </Space>
  )
}

export default CharacterTable
