import {
  DeleteFilled,
  EditFilled,
  MinusCircleFilled,
  UserOutlined,
  UploadOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  Radio,
  Select,
  Table,
  Tag,
  Tooltip,
  Upload,
  Checkbox,
  Tabs
} from "antd";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import OptionsBar from "../components/OptionsBar";
import PageTitle from "../components/PageTitle";
import { loadingAction } from "../store/Actions";
import { FetchSiteGroup } from "../store/Effects";
import { AppStateType } from "../types";
import iconImage from '../assets/images/head.png'

interface FormFields {
  displayName: string;
  description: string;
  visibility: string;
  owners: string[];
}

const GroupEditForm: React.FC = () => {
  const siteGroup = useSelector(
    (state: AppStateType) => state.mainStore.siteGroup,
    shallowEqual
  );

  const [form] = Form.useForm<FormFields>();

  const initialValues: FormFields = {
    description: "",
    displayName: "",
    visibility: "public",
    owners: [],
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams<any>();

  // TO BE CHANGED
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // TO BE CHANGED
  const onChange = (checkedValues: Boolean) => {
    console.log('checked = ', checkedValues);
  }

  useEffect(() => {
    if (id && siteGroup.displayName === "") {
      dispatch(FetchSiteGroup(id));
      dispatch(loadingAction(false));
    }
  }, [dispatch, id, siteGroup.displayName]);

  useEffect(() => {
    form.setFieldsValue({
      displayName: siteGroup.displayName ? siteGroup.displayName : "",
      description: siteGroup.description ? siteGroup.description : "",
      visibility: siteGroup.visibility
        ? siteGroup.visibility.toLowerCase()
        : "public",
      owners: ["owner1", "owner3"],
    });
  }, [form, siteGroup]);

  const onFinish = (values: FormFields) => {
    console.log(values);
  };


  const dataSource = [
    {
      key: "1",
      firstName: "Member 1",
      lastName: "Member 1",
      email: "member@member.com",
      phone: "+123456789",
      status: "Active",
    },
    {
      key: "2",
      firstName: "Member 1",
      lastName: "Member 1",
      email: "member@member.com",
      phone: "+123456789",
      status: "Active",
    },
    {
      key: "3",
      firstName: "Member 1",
      lastName: "Member 1",
      email: "member@member.com",
      phone: "+123456789",
      status: "Active",
    },
  ];



  const columns = [
    {
      title: <Checkbox />,
      dataIndex: "picture",
      key: "picture",
      width: "75px",
      render: (ischecked: string) => (
        <Checkbox.Group options={['']} defaultValue={[0]} />),
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
    // {
    //   title: "Action",
    //   key: "action",
    //   width: "75px",
    //   render: (text: any, record: any, index: any) => (
    //     <span>
    //       <Button.Group>
    //         <Button type="default" htmlType="button">
    //           <Tooltip title="Edit">
    //             <EditFilled />
    //           </Tooltip>
    //         </Button>
    //         <Button type="default" htmlType="button">
    //           <Tooltip title="Disable">
    //             <MinusCircleFilled />
    //           </Tooltip>
    //         </Button>
    //         <Button type="default" htmlType="button">
    //           <Tooltip title="Delete">
    //             <DeleteFilled />
    //           </Tooltip>
    //         </Button>
    //       </Button.Group>
    //     </span>
    //   ),
    // },
  ];

  return (
    <div>
      <PageTitle
        heading={
          siteGroup.displayName.length > 0
            ? `Edit Group - ${siteGroup.displayName}`
            : "Edit Group"
        }
        iconImage={iconImage}

        groupVisibitliy={siteGroup.visibility}
        subheading="Edit group details"
        backgroundColor="white"
      />

      <div className="page-container">

        <Tabs
          defaultActiveKey="1"
        >
          <Tabs.TabPane tab="DETAILS" key="1">

            <Form style={{ margin: "1%" }}>
              <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                <div style={{ textAlign: "right" }}>
                  <Button type="primary" htmlType="submit" style={{ marginRight: "1%"}}>
                    Save
                  </Button>
                  <Button
                    type="default"
                    htmlType="button"
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </Button>
                </div>
              </Form.Item>
            </Form>

            <h2 style={{ paddingLeft: "20%" }} >Group Details</h2>
            <hr className="hr-group-edit" />
            <br />

            <Form
              name="groupEditForm"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onFinish={onFinish}
              form={form}
              initialValues={initialValues}
            >
              <Form.Item
                label="Group Name"
                name="displayName"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input style={{ width: "50%" }} />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: false }]}
              >
                <Input style={{ width: "50%" }} />
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
                <Select mode="multiple" placeholder="Select owners" style={{ width: "50%" }} >
                  <Select.Option value="owner1">Owner 1</Select.Option>
                  <Select.Option value="owner2">Owner 2</Select.Option>
                  <Select.Option value="owner3">Owner 3</Select.Option>
                  <Select.Option value="owner4">Owner 4</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Members">
                <Button type="default" htmlType="button">
                  Import Members
              </Button>
              </Form.Item>


              <Form.Item wrapperCol={{ span: 24 }}>

              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="MEMBERS" key="2">
            <OptionsBar />

            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              size="small"
              scroll={{ x: true, y: 250 }}
              tableLayout={"fixed"}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>

    </div>
  );
};

export default GroupEditForm;
