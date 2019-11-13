import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Skeleton, List, Typography, Icon } from "antd";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
// import renderHtml from "react-render-html";
import moment from "moment";
import "./blogs.css";

// ------------ ant destructirze -------
const { Text, Paragraph } = Typography;

class Blogs extends Component {
  state = {
    loading: true
  };

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/login");
    }
    const { blogsFetched } = this.props;

    let blogsList = <Skeleton loading={true} active></Skeleton>;
    if (blogsFetched && blogsFetched.length !== 0) {
      console.log(blogsFetched);
      blogsList = (
        <List
          itemLayout="vertical"
          dataSource={blogsFetched}
          renderItem={({
            id,
            authorName,
            createdAt,
            description,
            title,
            readTime
          }) => (
            <List.Item
              key={id}
              extra={
                <img
                  width={210}
                  alt="Blog Thumbnail"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                // avatar={
                //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                // }
                title={<Link to={`/blog-detail/${id}`}>{title}</Link>}
                description={
                  <Paragraph ellipsis={{ rows: 2 }}>{description}</Paragraph>
                }
              />
              <div className="flex-row">
                <div className="flex-col">
                  <Text strong>by {authorName}</Text>
                  <Text type="secondary">
                    {moment(createdAt.toDate()).calendar()},{" "}
                    {moment(createdAt.toDate()).format("MMM DD, YYYY")}
                    {` `} • {readTime} min read <Icon type="read" />
                  </Text>
                </div>
              </div>
            </List.Item>
          )}
        />
      );
    } else if (blogsFetched && blogsFetched.length === 0) {
      blogsList = <Text strong>Empty Blogs</Text>;
    }

    return <div className="blogs-show-wrapper">{blogsList}</div>;
  }
}
const mapStateToProps = (
  { firebaseReducer, firestoreReducer: { ordered } },
  props
) => {
  // console.log(ordered);
  return {
    blogsFetched: ordered.blogs ? ordered.blogs : null,
    isAuthenticated: !firebaseReducer.auth.isEmpty
  };
};

export default compose(
  firestoreConnect([
    { collection: "blogs", orderBy: ["createdAt", "desc"] } // or `todos/${props.todoId}`
  ]),
  connect(mapStateToProps)
)(Blogs);
