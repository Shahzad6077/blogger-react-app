import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { Layout } from "antd";
import SignInLinks from "./SideBarLinks/signInLinks";
import SignOutLinks from "./SideBarLinks/signOutLinks";
import logo2 from "../../../assets/header-logo.svg";

import "./sider.css";

const { Sider } = Layout;

const Slider = props => {
  const { isAuthenticated, collapsed, setCollapsed } = props;

  // let trigger_classes = ["Sider_trigger"];

  return (
    <Sider
      trigger={null}
      breakpoint="md"
      collapsedWidth="0"
      collapsed={collapsed}
      collapsible={collapsed}
      onCollapse={value => setCollapsed(value)}
      className="Sider"
    >
      <div className="logo Logo_container">
        <img className="Logo" src={logo2} alt="Logo" />
      </div>
      {isAuthenticated ? (
        <SignInLinks setCollapsed={() => setCollapsed(!collapsed)} />
      ) : (
        <SignOutLinks setCollapsed={() => setCollapsed(!collapsed)} />
      )}
    </Sider>
  );
};

const mapStateToProps = ({ firebaseReducer }) => {
  return {
    isAuthenticated: !firebaseReducer.auth.isEmpty
  };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Slider);
/* <Affix>
        <span
          className={trigger_classes.join(" ")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Icon type="align-right" />
        </span>
      </Affix> */
