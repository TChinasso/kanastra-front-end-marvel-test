


import React from 'react';
import { Character } from '../../../../types/index';
import { Table } from 'antd';
interface ComicsTableProps {
  character: Character;
  loading: boolean
}

const ComicsTable: React.FC<ComicsTableProps> = ({ character, loading }) => {

  const dataSource = character.comics?.items.map((comic, index) => {
    return {
        key: index,
        ...comic
    }
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

  ];

  return (
    <div className='grow'>
      <Table  pagination={false} dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default ComicsTable;