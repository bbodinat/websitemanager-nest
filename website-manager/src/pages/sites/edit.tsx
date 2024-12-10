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
  useBreadcrumb,
  useCreate,
  useDelete,
  useModal,
  useOne,
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
  Tabs,
  Typography,
} from 'antd';
import { on } from 'events';
import { copyFileSync } from 'fs';
import {
  Link,
  Outlet,
  Route,
  Routes,
  useOutletContext,
  useParams,
  useRoutes,
} from 'react-router-dom';
// import { PagesList } from '../pages';

export const SiteEdit = () => {
  const {id} = useParams<{id: string}>();
  console.log(id);
  const {data } = useOne({
    resource: 'sites',
    id: id,
    // meta: { populate: ['pages'] }, // Include the 'pages' relation
  });
  const siteDatas = data?.data;
  console.log(siteDatas);
  // const siteDatas = query?.data?.data;
  if (!siteDatas) return null;

  // const {breadcrumbs} = useBreadcrumb();
  // breadcrumbs.push({ label: siteDatas.name, href: `/sites/edit/${siteDatas.id}` });

  return (
    <Edit
      title={`${siteDatas.name}`}
      // saveButtonProps={saveButtonProps}
      footerButtons={false}
      headerButtons={[
        <Link to={`/sites/edit/${siteDatas.id}/`}>
          <Button>Settings</Button>
        </Link>,
        <Link
          to={{
            pathname: `/sites/edit/${siteDatas.id}/pages`,
          }}
        >
          <Button>Pages</Button>
        </Link>,
        <Link to={`/sites/edit/${siteDatas.id}/layouts`}>
          <Button>Layouts</Button>
        </Link>,
      ]}
    >
      <Outlet context={{ site: siteDatas }} />

      
    </Edit>
  );
};

export const SiteSettings = () => {
  const { formProps, saveButtonProps } = useForm({
    redirect: false,
  });
  return (
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
      <Form.Item>
        <Button {...saveButtonProps} type="primary">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export const PagesList = () => {
  const update = useUpdate<BaseRecord, HttpError>({
    resource: 'pages',
  });
  const { site } = useOutletContext<{ site: BaseRecord }>();

  // Pass permanent filters to always fetch pages belonging to a specific site
  const { tableProps } = useTable<BaseRecord, HttpError>({
    resource: 'pages',
    syncWithLocation: false,
    sorters: {},
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

  // const { modalProps: createModalProps, show: showEdit } = useModalForm<any>({
  //   action: 'edit',
  //   resource: 'pages',
  // });

  return (
    <>
      <PageCreateModal site={site} props={createModal} />

      <Table
        {...tableProps}
        rowKey="id"
        footer={() => <CreateButton onClick={() => createModal.show()} />}
      >
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter={(a, b) => a.id - b.id}
        />
        <Table.Column
          dataIndex="name"
          title="Name"
          sorter={(a, b) => a.name.localeCompare(b.name)}
        />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          dataIndex="layout"
          title="Layout"
          render={(layout: BaseRecord, record: BaseRecord) => (
            <Select
              defaultValue={layout}
              key={`layout-${record.id}`}
              style={{ width: 120 }}
              onChange={(value) => {
                update.mutate({
                  id: record.id,
                  values: { layout: value },
                });
              }}
              options={site.layouts.map((layout: BaseRecord) => ({
                label: layout.name,
                value: layout.id,
              }))}
            />
          )}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton
                hideText
                resource="pages"
                size="small"
                // onClick={() => showEdit(record.id)}
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
export const LayoutsList = () => {
  const { site } = useOutletContext<{ site: BaseRecord }>();

  const { tableProps } = useTable<BaseRecord, HttpError>({
    resource: 'layouts',
    syncWithLocation: false,
    sorters: {},
    filters: {
      permanent: [
        {
          field: 'site.id',
          operator: 'eq',
          value: site.id,
        } as CrudFilter,
      ],
    },
  });

  const createModal = useModalForm<any, HttpError, any>({
    action: 'create',
    resource: 'layouts',
    redirect: false,
    createMutationOptions: {
      onMutate: ({ values }) => {
        values.site = site.id;
      },
    },
    defaultFormValues: {
      site,
      name: 'New Layout',
    },
  });

  return (
    <>
      <LayoutCreateModal site={site} props={createModal} />

      <Table
        {...tableProps}
        rowKey="id"
        footer={() => <CreateButton onClick={() => createModal.show()} />}
      >
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter={(a, b) => a.id - b.id}
        />
        <Table.Column
          dataIndex="name"
          title="Name"
          sorter={(a, b) => a.name.localeCompare(b.name)}
        />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton
                hideText
                resource="layouts"
                size="small"
                onClick={() => createModal.show(record.id)}
              />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                resource="layouts"
              />
            </Space>
          )}
        />
      </Table>
    </>
  );
};

const LayoutCreateModal = ({
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
          label="Layout Name"
          rules={[{ required: true, message: 'Please enter the layout name' }]}
        >
          <Input placeholder="Enter layout name" />
        </Form.Item>
        <Form.Item
          name={'description'}
          label="Layout Description"
          rules={[
            { required: false, message: 'Please enter the layout description' },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter layout description" />
        </Form.Item>
      </Form>
    </Modal>
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
