import React, { useState } from "react";

import { Layout, Breadcrumb } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import Slider from "../UI/Sider/sider";
import Header from "../UI//header/header";
import "./layout.css";
const { Content, Footer } = Layout;

const LayoutComp = props => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    // This layout is the whole app layout
    <Layout className="app-wrapper">
      <Slider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Scrollbars className="scrollBar">
        <Layout className="Layout ">
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content className="content-wrapper">
            <Breadcrumb className="bread-crumb">
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">{props.children}</div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Blogger ©2018 Created by M SHAHZAD ALI
          </Footer>
        </Layout>
      </Scrollbars>
    </Layout>
  );
};

export default LayoutComp;
