import { AntdInferencer } from '@refinedev/inferencer/antd';

import React from 'react';
import { BaseRecord, CrudFilters, HttpError } from '@refinedev/core';
import { useTable, List, EditButton, ShowButton, DeleteButton } from '@refinedev/antd';
import { Table, Space } from 'antd';


export const PagesList = () => {
  const { tableProps } = useTable();
  return (
    <List>
      <Table {...tableProps}  rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column dataIndex={['site', 'name']} title="Site" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
