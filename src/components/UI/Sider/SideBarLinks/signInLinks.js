import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { Menu, Icon, Typography } from "antd";
import Avatar from "../../Avatar";
import * as actionCreator from "../../../../Store/action/index";

const { Title } = Typography;
class SignInLinks extends Component {
  state = {};

  render() {
    const { onLogout, username, initialName, setCollapsed } = this.props;
    const itemList = [
      { title: "Create Blog", type: "form", path: "/create-blog" },
      { title: "Blog", type: "form", path: "/blogs" },
      { title: "Favourite", type: "heart", path: "/fav-posts" },
      { title: "Logout", type: "logout", path: "/login", clicked: onLogout }
    ];
    const items = itemList.map(({ title, type, path, clicked }, index) => {
      return (
        <Menu.Item key={index + type} onClick={setCollapsed}>
          <NavLink to={path} onClick={clicked}>
            <Icon type={type} />
            <span>{title}</span>
          </NavLink>
        </Menu.Item>
      );
    });

    return (
      <div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Avatar title={initialName} />
          {username ? (
            <Title
              type="secondary"
              level={4}
              style={{ textAlign: "center", color: "white", fontSize: "18px" }}
            >
              {username}
            </Title>
          ) : null}
          {items}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({ firebaseReducer }) => {
  return {
    username: firebaseReducer.profile.username,
    initialName: firebaseReducer.profile.initialName
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: props => dispatch(actionCreator.logout(props))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInLinks);
