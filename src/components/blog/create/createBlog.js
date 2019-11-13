import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actionCreator from "../../../Store/action/index";
import { Button } from "antd";
import { message, Input } from "flwww";
import ReactQuill from "../../UI/Editor";
import "./createBlog.css";
import "react-quill/dist/quill.snow.css";

class CreateBlog extends Component {
  state = {
    editorValue: "",
    titleValue: "",
    discValue: "",
    readTime: ""
  };
  onInfoHandler = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
    console.log(this.state[event.currentTarget.name]);
  };
  setData = data => {
    this.setState({
      editorValue: data
    });
  };
  handlePublish = () => {
    if (!this.props.publishLoading) {
      const data = {
        content: this.state.editorValue,
        title: this.state.titleValue,
        discription: this.state.discValue,
        readTime: this.state.readTime
      };
      this.props
        .onPublishBlog(data)
        .then(res => {
          message(
            `Blog -> ${this.state.titleValue} is Publish Successfully}`,
            "success"
          );
          this.props.history.push(`/blog-detail/${res}`);
        })
        .catch(err => {
          console.log("return err:", err);
        });
    } else {
      message("Blog is publish Please wait.", "error");
    }
  };
  render() {
    const { publishLoading, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      message("Please first Login...", "warning");
      return <Redirect to="/login" />;
    }
    const { onInfoHandler } = this;
    return (
      <form onSubmit={this.handlePublish}>
        <div className="Create_Post">
          <p> Here create your blog </p>
          <ReactQuill
            placeholder="Write something here....."
            handleChange={this.setData}
            value={this.state.editorValue}
          />
          <div className="input-wrapper">
            <p>
              <span style={{ color: "red" }}>*</span> Enter Title
            </p>
            <Input
              value={this.state.titleValue}
              onChange={onInfoHandler}
              name="titleValue"
              placeholder="Enter blog title"
            />
          </div>
          <div className="input-wrapper">
            <p>
              <span style={{ color: "red" }}>*</span> Enter discription
            </p>
            <Input
              name="discValue"
              value={this.state.discValue}
              onChange={onInfoHandler}
              placeholder="Enter small discription"
            />
          </div>
          <div className="input-wrapper">
            <p>
              <span style={{ color: "red" }}>*</span> Enter Read Time
            </p>
            <Input
              value={this.state.readTime}
              name="readTime"
              type="number"
              onChange={onInfoHandler}
              placeholder="Estimate Read Time"
            />
          </div>
          <div className="publish-btn-wrapper">
            <Button
              type="primary"
              size="large"
              loading={publishLoading}
              onClick={this.handlePublish}
            >
              {publishLoading ? null : "PUBLISH"}
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ blogReducer, firebaseReducer }) => {
  return {
    publishLoading: blogReducer.loading,
    isAuthenticated: !firebaseReducer.auth.isEmpty
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onPublishBlog: data => dispatch(actionCreator.createBlog(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBlog);
