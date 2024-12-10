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
    syncWithLocation: true,
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

  const createPage = useCreate({
    resource: 'pages',
  });
  const createModal = useModalForm<any, HttpError, any>({
    action: 'create',
    resource: 'pages',
    redirect: false,
    defaultFormValues: {
      site,
    },
    mutationMeta: {
      populate: ['site'],
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
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="description" title="Description" />
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

  const { selectProps } = useSelect({
    resource: 'sites', // The resource to fetch (must match the API route)
    optionLabel: 'name', // The property to use as the label
    optionValue: 'id', // The property to use as the value
  });
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
        <Form.Item name={['site', 'id']} initialValue={site} label="Site">
          <Select
            {...selectProps}
            defaultValue={{
              value: site.id,
              label: site.name,
            }}
            placeholder="Select a site"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
