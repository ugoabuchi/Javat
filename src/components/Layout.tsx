import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Drawer,
  Dropdown,
  Grid,
  Layout as AntLayout,
  Menu,
} from "antd";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../store/Actions";
import { AppStateType } from "../types";
import Loader from "./Loader";
import Navigation from "./Navigation";

const { Header, Footer, Sider, Content } = AntLayout;
const { useBreakpoint } = Grid;

const Layout: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const screens = useBreakpoint();

  const user = useSelector(
    (state: AppStateType) => state.mainStore.user,
    shallowEqual
  );
  const loading = useSelector(
    (state: AppStateType) => state.mainStore.loading,
    shallowEqual
  );
  const dispatch = useDispatch();

  const triggerClickHandle = () => {
    setCollapsed(!collapsed);
    setDrawerVisible(!drawerVisible);
  };

  const logoutClickHandle = () => {
    dispatch(userLogoutAction());
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <AntLayout
        style={{ minHeight: "100vh" }}
        hasSider={true}
        className={"layout-container"}
      >
        {/* SLIDER */}
        {screens.lg && (
          <Sider
            width="260"
            collapsible={true}
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
            trigger={null}
            breakpoint="xl"
            collapsedWidth={!screens.lg ? 0 : 80}
            className={"slider"}
          >
            <Navigation collapsed={collapsed} />
          </Sider>
        )}

        <AntLayout>
          {/* HEADER */}
          <Header className={"header"}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: triggerClickHandle,
              }
            )}

            {!screens.lg && (
              <img
                src={require("../assets/images/logo-inverse.png")}
                alt="Logo"
              />
            )}

            <Dropdown overlay={menu(logoutClickHandle)} trigger={["click"]}>
              <div className={"user-dropdown"}>
                <div className={"username"}>
                  {user.displayName !== ""
                    ? user.displayName
                    : "No Display Name"}
                </div>
                <Avatar
                  size="default"
                  icon={<UserOutlined />}
                  // src={store.user.picture}
                />
              </div>
            </Dropdown>
          </Header>

          {/* CONTENT BODY */}
          <Content className={"content"}>{props.children}</Content>

          {/* FOOTER */}
          <Footer style={{ textAlign: "center" }}>
            Copyright © JAVAT 365 - {new Date().getFullYear()}
          </Footer>
        </AntLayout>

        {/* DRAWER */}
        {!screens.lg && (
          <Drawer
            placement="left"
            closable={true}
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
          >
            <Navigation collapsed={false} drawerClose={setDrawerVisible} />
          </Drawer>
        )}
      </AntLayout>
    </>
  );
};

export default Layout;

const menu = (logoutClickHandle: () => void) => (
  <Menu>
    <Menu.Item key="0" onClick={logoutClickHandle}>
      Logout
    </Menu.Item>
  </Menu>
);
