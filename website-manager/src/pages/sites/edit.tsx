import {
  DeleteButton,
  Edit,
  useTable,
  EditButton,
  ShowButton,
  useForm,
  CreateButton,
  useModalForm,
  UseModalFormReturnType,
  useSelect,
} from '@refinedev/antd';

import {
  BaseRecord,
  CrudFilter,
  HttpError,
  useCreate,
  useDelete,
  useModal,
  useUpdate,
} from '@refinedev/core';
import {
  Button,
  Form,
  Input,
  Modal,
  ModalProps,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import { on } from 'events';
import { copyFileSync } from 'fs';
// import { PagesList } from '../pages';

export const SiteEdit = () => {
  const { formProps, saveButtonProps, query } = useForm({
    redirect: false,
    meta: { populate: ['pages'] }, // Include the 'pages' relation
  });
  const siteDatas = query?.data?.data;
  if (!siteDatas) return null;
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name={['name']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name={['description']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={8} />
        </Form.Item>
      </Form>
      <Typography.Title level={4}>Pages</Typography.Title>

      <PagesList site={siteDatas} />
    </Edit>
  );
};

export const PagesList = ({ site }: { site: BaseRecord }) => {
  // Pass permanent filters to always fetch pages belonging to a specific site
  const { tableProps } = useTable<BaseRecord, HttpError>({
    resource: 'pages',
    syncWithLocation: false,
    sorters: {
      
    },
    filters: {
      permanent: [
        {
          field: 'site.id', // Filter by site.id
          operator: 'eq',
          value: site.id,
        } as CrudFilter,
      ],
    },
  });

  const createModal = useModalForm<any, HttpError, any>({
    action: 'create',
    resource: 'pages',
    redirect: false,
    createMutationOptions: {
      onMutate: ({ values }) => {
        values.site = site.id;
      },
    },
    defaultFormValues: {
      site,
      name: 'Nouvelle page',
    },
  });

  const { modalProps: createModalProps, show: showCreate } = useModalForm<any>({
    action: 'create',
    resource: 'pages',
  });

  return (
    <>
      <PageCreateModal site={site} props={createModal} />

      <Table
        {...tableProps}
        rowKey="id"
        footer={() => <CreateButton onClick={() => createModal.show()} />}
      >
        <Table.Column dataIndex="id" title="ID"
          sorter={(a, b) => a.id - b.id}
        />
        <Table.Column dataIndex="name" title="Name" 
          sorter={(a, b) => a.name.localeCompare(b.name)}
        />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column dataIndex="layout.name" title="Layout" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton
                hideText
                resource="pages"
                size="small"
                onClick={() => createModal.show(record.id)}
              />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                resource="pages"
              />
            </Space>
          )}
        />
      </Table>
    </>
  );
};

const PageCreateModal = ({
  props,
  site,
}: {
  props: UseModalFormReturnType;
  site: BaseRecord;
}) => {
  const { formProps, modalProps } = props;

  

  return (
    <Modal {...modalProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          name={'name'}
          label="Page Name"
          rules={[{ required: true, message: 'Please enter the page name' }]}
        >
          <Input placeholder="Enter page name" />
        </Form.Item>
        <Form.Item
          name={'description'}
          label="Page Description"
          rules={[
            { required: false, message: 'Please enter the page description' },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter page description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
