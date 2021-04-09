import React, { SetStateAction } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

interface Props {
  collapsed: boolean;
  drawerClose?: (value: SetStateAction<boolean>) => void;
}

const Navigation: React.FC<Props> = ({ collapsed, drawerClose }) => {
  let location = useLocation();

  const defaultLocation = (): string[] => {
    if (location.pathname.length === 1) return ["/"];
    if (location.pathname.length > 1) return [location.pathname.slice(1)];
    return [];
  };

  return (
    <Menu
      defaultSelectedKeys={defaultLocation()}
      // defaultOpenKeys={defaultLocation()}
      mode="inline"
      className="navigation"
    >
      <div className="menu-logo">
        {collapsed ? (
          <img src={require("../assets/images/logo.png")} alt="Logo" />
        ) : (
          <img src={require("../assets/images/logo-inverse.png")} alt="Logo" />
        )}
      </div>

      {!collapsed && <div className={"menu-heading"}>MANAGE</div>}

      <Menu.Item
        key="/"
        title="Dashboard"
        onClick={drawerClose ? () => drawerClose(false) : undefined}
      >
        <Link to="/">
          <div className="menu-item">
            <i className="pe-7s-graph2"></i>
            {!collapsed && <span>Dashboard</span>}
          </div>
        </Link>
      </Menu.Item>

      <Menu.Item
        key="siteGroups"
        title="Groups"
        onClick={drawerClose ? () => drawerClose(false) : undefined}
      >
        <Link to="/siteGroups">
          <div className="menu-item">
            <i className="pe-7s-folder"></i>
            {!collapsed && <span>Groups</span>}
          </div>
        </Link>
      </Menu.Item>

      <Menu.Item
        key="activities"
        title="Activities"
        onClick={drawerClose ? () => drawerClose(false) : undefined}
      >
        <Link to="/activities">
          <div className="menu-item">
            <i className="pe-7s-news-paper"></i>
            {!collapsed && <span>Activities</span>}
          </div>
        </Link>
      </Menu.Item>

      {!collapsed && <div className={"menu-heading"}>ADMINISTRATOR</div>}

      <Menu.Item
        key="settings"
        title="Settings"
        onClick={drawerClose ? () => drawerClose(false) : undefined}
      >
        <Link to="/settings">
          <div className="menu-item">
            <i className="pe-7s-settings"></i>
            {!collapsed && <span>Settings</span>}
          </div>
        </Link>
      </Menu.Item>

      <Menu.Item
        key="manageUsers"
        title="Manage Users"
        onClick={drawerClose ? () => drawerClose(false) : undefined}
      >
        <Link to="/manageUsers">
          <div className="menu-item">
            <i className="pe-7s-users"></i>
            {!collapsed && <span>Manage Users</span>}
          </div>
        </Link>
      </Menu.Item>

      <Menu.Item
        key="groupRequests"
        title="Group Requests"
        onClick={drawerClose ? () => drawerClose(false) : undefined}
      >
        <Link to="/groupRequests">
          <div className="menu-item">
            <i className="pe-7s-bell"></i>
            {!collapsed && <span>Group Requests</span>}
          </div>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
