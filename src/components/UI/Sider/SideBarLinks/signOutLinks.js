import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { Menu, Icon } from "antd";
import Avatar from "../../Avatar";
const itemList = [
  { title: "Login", type: "login", path: "/login" },
  { title: "Sign up", type: "user", path: "/signup" }
];

class SignOutLinks extends Component {
  state = {};
  render() {
    const { setCollapsed } = this.props;

    const items = itemList.map(({ title, type, path }, index) => {
      return (
        <Menu.Item key={index + type} onClick={setCollapsed}>
          <NavLink to={path}>
            <Icon type={type} />
            <span>{title}</span>
          </NavLink>
        </Menu.Item>
      );
    });
    const icon = <Icon type="user-add" />;
    return (
      <div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Avatar title={icon} style={{ backgroundColor: "#383D5A" }} />
          {items}
        </Menu>
      </div>
    );
  }
}

export default SignOutLinks;
