import {
  DeleteFilled,
  EditFilled,
  MinusCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Form, Input, Modal, Table, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import OptionsBar from "../components/OptionsBar";
import PageTitle from "../components/PageTitle";

interface FormFields {
  email: string;
}

const ManageUsers = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<{ status: boolean; id: string }>({
    status: false,
    id: "",
  });

  const [form] = Form.useForm<FormFields>();

  const initialValues: FormFields = {
    email: "",
  };

  const addEditUserHandler = (values: any) => {
    console.log(values);
    setShowModal(false);
  };

  const showEditUserModel = (id: string) => {
    const index = dataSource.findIndex((d) => d.key === id);
    if (index === -1) return;

    const data = dataSource[index];
    form.setFieldsValue({ email: data.email });
    setShowModal(true);
    setEdit({ status: true, id: id });
  };

  const columns = [
    {
      title: "Picture",
      dataIndex: "picture",
      key: "picture",
      width: "75px",
      render: (pic: string) => (
        <span>
          <Avatar shape="square" size={30} icon={<UserOutlined />} src={pic} />
        </span>
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "100px",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "100px",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "150px",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "100px",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "75px",
      render: (status: string) => (
        <span>
          <Tag>{status.toUpperCase()}</Tag>
        </span>
      ),
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      width: "75px",
      render: (status: string) => (
        <span>
          <Tag>{status.toUpperCase()}</Tag>
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "75px",
      render: (text: any, record: any, index: any) => (
        <span>
          <Button.Group>
            <Button
              type="default"
              htmlType="button"
              onClick={() => showEditUserModel(record.key)}
            >
              <Tooltip title="Edit">
                <EditFilled />
              </Tooltip>
            </Button>
            <Button
              type="default"
              htmlType="button"
              onClick={() =>
                confirmModel(
                  "Disable",
                  "Are you sure you want to disable this user?"
                )
              }
            >
              <Tooltip title="Disable">
                <MinusCircleFilled />
              </Tooltip>
            </Button>
            <Button
              type="default"
              htmlType="button"
              onClick={() =>
                confirmModel(
                  "Delete",
                  "Are you sure you want to delete this user?"
                )
              }
            >
              <Tooltip title="Delete">
                <DeleteFilled />
              </Tooltip>
            </Button>
          </Button.Group>
        </span>
      ),
    },
  ];

  const dataSource = [
    {
      key: "1",
      firstName: "Admin User",
      lastName: "Admin User",
      email: "member@admin.com",
      phone: "+123456789",
      status: "Active",
      role: "Admin",
    },
    {
      key: "2",
      firstName: "Super Admin User",
      lastName: "Super Admin User",
      email: "member@superadmin.com",
      phone: "+123456789",
      status: "Active",
      role: "Super Admin",
    },
    {
      key: "3",
      firstName: "Admin User",
      lastName: "Admin User",
      email: "member@member.com",
      phone: "+123456789",
      status: "Active",
      role: "Admin",
    },
  ];

  const confirmModel = (title: string, content: string) => {
    Modal.confirm({
      title: title,
      content: content,
    });
  };

  return (
    <div>

      <PageTitle
        heading="Manage Users"
        subheading="Manage admin users"
        showCreateAction={true}
        createActionLabel={"Add User"}
        icon={"pe-7s-users icon-gradient bg-happy-itmeo"}
        createBtnHanlde={() => setShowModal(true)}
      />
      <div className="page-container">
        <OptionsBar />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          size="middle"
          scroll={{ x: true }}
          tableLayout={"fixed"}
        />
      </div>

      <Modal
        title="Add new user"
        visible={showModal}
        okText="Add User"
        cancelText="Cancel"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              addEditUserHandler(values);
            })
            .catch((info) => console.log(info));
        }}
        okButtonProps={{ htmlType: "submit" }}
        onCancel={() => {
          setShowModal(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          initialValues={initialValues}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUsers;
