

'use client'

import { TableProps } from 'antd'
import { DataTableType } from '../CharacterTable.types'
import { useQuery } from '@apollo/client/react';
import { GET_CHARACTERS } from '@/app/graphql/queries';

const PAGE_SIZE = 10

const useCharacterTable = () => {
  const columns: TableProps<DataTableType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender'
    },
    {
      title: 'Birth Year',
      dataIndex: 'birthYear',
      key: 'birthYear'
    },
    {
      title: 'Detail',
      dataIndex: 'btnDetail',
      key: 'btnDetail'
    }
  ]

  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
      variables: { first: PAGE_SIZE, after: null },
    });

  const rows: DataTableType[] =
    data?.allPeople?.people?.map((person) => ({
      id: person.id,
      name: person.name,
      gender: person.gender ?? 'unknown',
      birthYear: person.birthYear ?? 'unknown',
      btnDetail: '',
    })) ?? [];

  return {
    columns,
    data: rows,
    loading,
    error,
    fetchMore,
  }
}

export default useCharacterTable
