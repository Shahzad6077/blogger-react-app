import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router";

import Layout from "./components/layout/layout";
import Blogs from "./components/blog/blog";
import BlogDetail from "./components/blog/blogDetail";
import CreateBlog from "./components/blog/create/createBlog";
import LoginForm from "./components/authPages/login";
import SignupForm from "./components/authPages/signUp";

import "react-quill/dist/quill.snow.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Layout>
          <Switch>
            <Route path="/signup" component={SignupForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/create-blog" component={CreateBlog} />
            <Route path="/blogs" component={Blogs} />
            <Route path="/blog-detail/:id" component={BlogDetail} />
            <Route path="/" render={() => <h3>Dashboard</h3>} />
          </Switch>
        </Layout>
      </Fragment>
    );
  }
}

export default App;
