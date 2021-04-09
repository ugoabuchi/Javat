import { UsergroupAddOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Form, Input, Modal, Radio, Select, Table, Tag, Button, Upload } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { CreateGroup, FetchSiteGroups } from "../store/Effects";
import { AppStateType } from "../types";

interface FormFields {
  groupName: string;
  visibility: string;
  desc: string;
  owners: string[];
}

const Groups: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form] = Form.useForm<FormFields>();

  const groups = useSelector(
    (state: AppStateType) => state.mainStore.siteGroups,
    shallowEqual
  );

  const isAdmin = useSelector(
    (state: AppStateType) => state.mainStore.isAdmin,
    shallowEqual
  );

  const initialValues: FormFields = {
    groupName: "",
    visibility: "public",
    desc: "",
    owners: [],
  };

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(FetchSiteGroups());
  }, [dispatch]);

  const createGroupHandle = (values: any) => {
    console.log(values);
    dispatch(CreateGroup({ name: values.groupName, desc: values.desc }));
    setShowModal(false);
  };

  const owners = []
  const columns = [
    {
      title: "Picture",
      dataIndex: "picture",
      key: "picture",
      width: "75px",
      render: (pic: string) => (
        <span>
          <Avatar
            shape="square"
            size={50}
            icon={<UsergroupAddOutlined />}
            src={pic}
          />
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: "90px",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "100px",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      width: "350px",
    },
    {
      title: "Visibility",
      dataIndex: "visibility",
      key: "visibility",
      width: "75px",
      render: (vis: string) => (
        <span>
          <Tag
            color={
              vis.toUpperCase() === "PUBLIC"
                ? "green"
                : vis.toUpperCase() === "PRIVATE"
                ? "red"
                : ""
            }
          >
            {vis.toUpperCase()}
          </Tag>
        </span>
      ),
    },
  ];

  const dataSource =
    groups.length > 0
      ? groups.map((d) => {
          return {
            key: d.id,
            picture: d.photo,
            created_at: dayjs(d.createdAt).format("MMM DD, YYYY"),
            name: d.displayName,
            desc: d.description,
            visibility: d.visibility,
          };
        })
      : [];
      console.log(groups)

  return (
    <div>
      <PageTitle
        heading="Groups"
        subheading="Manage groups in your organization"
        showCreateAction={isAdmin}
        icon={"pe-7s-folder icon-gradient bg-happy-itmeo"}
        createBtnHanlde={() => setShowModal(true)}
      />
      <div className="page-container">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          size="middle"
          scroll={{ x: true }}
          tableLayout={"fixed"}
          onRow={(rec, index) => {
            return {
              onClick: () => history.push(`/siteGroups/${rec.key}`),
            };
          }}
        />
      </div>

      <Modal
        title="Create new Group"
        visible={showModal}
        okText="Create Group"
        cancelText="Cancel"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              createGroupHandle(values);
            })
            .catch((info) => console.log(info));
        }}
        okButtonProps={{ htmlType: "submit" }}
        onCancel={() => setShowModal(false)}
      >
        <Form
          form={form}
          initialValues={initialValues}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="Group Name"
            name="groupName"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="desc"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Visibility"
            name="visibility"
            rules={[{ required: true, message: "Required" }]}
          >
            <Radio.Group buttonStyle="outline">
              <Radio.Button value="public">Public</Radio.Button>
              <Radio.Button value="private">Private</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Owners"
            name="owners"
            rules={[{ required: true, message: "Required" }]}
          >

            <Select mode="multiple" placeholder="Select owners">
              <Select.Option value="owner1">Owner 1</Select.Option>
              <Select.Option value="owner2">Owner 2</Select.Option>
              <Select.Option value="owner3">Owner 3</Select.Option>
              <Select.Option value="owner4">Owner 4</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
              name="upload"
              label="Group Photo"
              valuePropName="fileList"
              // getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default Groups;
