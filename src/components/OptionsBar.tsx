import React, { useEffect, useState } from "react";
import { Layout, Menu, Button } from 'antd'
import { EditOutlined, DeleteOutlined, ImportOutlined, MinusCircleOutlined } from '@ant-design/icons';

interface MemberOptions {
  onClickEdit: ()=>string;
  onClickDisable: ()=>string;
  onClickDelete: ()=>string;
  importMembers: ()=>number[]|string[];
}
const OptionsBar: React.FC = (porps) => {

  return (
    <Layout className="layout" style={{ backgroundColor: "#ffffff" }}>
      <Layout.Header style={{ backgroundColor: "#ffffff", marginBottom: "20px"}}>
        <Menu theme="light" mode="horizontal">
          <Menu.Item key="1">
            <Button type="primary" icon={<EditOutlined />} size="middle" >Edit</Button>
          </Menu.Item>
          <Menu.Item key="2">
            <Button type="default" icon={<MinusCircleOutlined />} size="middle" >Disable</Button>
          </Menu.Item>
          <Menu.Item key="3">
            <Button type="default" icon={<DeleteOutlined />} size="middle" danger={true} >Delete</Button>
          </Menu.Item>
          <Menu.Item key="4">
            <Button type="default" icon={<ImportOutlined />} size="middle" >Import Members</Button>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    </Layout>
  )

}

export default OptionsBar;