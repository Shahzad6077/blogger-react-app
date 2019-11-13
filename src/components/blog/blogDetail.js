import React from "react";
import { Redirect } from "react-router-dom";
import { Typography, Avatar, Button, Skeleton } from "antd";
import moment from "moment";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import renderHtml from "react-render-html";
import { message } from "flwww";
const { Title, Text } = Typography;

const BlogDetail = props => {
  const { blogFetch, isAuthenticated } = props;
  if (!isAuthenticated) {
    message("Please first Login...", "warning");
    return <Redirect to="/login" />;
  }
  let blog = <Skeleton loading={true} active></Skeleton>;
  if (blogFetch) {
    const {
      // authorId,
      authorName,
      content,
      description,
      createdAt,
      title,
      readTime
    } = blogFetch;
    blog = (
      <div className="blogs-detail-wrapper">
        <Title level={1}>{title}</Title>
        <Title level={4} type="secondary" ellipsis={true}>
          {description}
        </Title>
        <div className="user-detail-wrapper flex-row">
          <Avatar icon="user" size={48} />
          <div className="flex-col">
            <div>
              <Text>{authorName}</Text>
              <Button
                type="primary"
                size="small"
                ghost
                className="user-follow-btn user-followed"
              >
                Follow
              </Button>
            </div>
            <Text>
              {moment(createdAt.toDate()).format("MMM DD, YYYY")} • {readTime}{" "}
              min read{" "}
            </Text>
          </div>
        </div>

        <div className="b-d-content">{renderHtml(content)}</div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary">Continue</Button>
        </div>
      </div>
    );
  }
  return <>{blog}</>;
};
const mapStateToProps = (
  { firestoreReducer: { data }, firebaseReducer },
  props
) => {
  const { id } = props.match.params;
  const fetchBlog = data.blogs ? data.blogs[id] : null;
  return {
    blogFetch: fetchBlog,
    isAuthenticated: !firebaseReducer.auth.isEmpty
  };
};

export default compose(
  firestoreConnect(props => {
    const { id } = props.match.params;
    return [{ collection: "blogs", doc: id }];
  }),
  connect(mapStateToProps)
)(BlogDetail);
