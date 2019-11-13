import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../../assets/utility";

const initialState = {
  loading: false,
  error: null
};

//TODO: this is main reducer.
const blogReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CREATE_BLOG_INIT:
      return updateObject(state, { loading: true });

    case actionTypes.CREATE_BLOG_SUCCESS:
      return createBlog(state, payload);

    case actionTypes.CREATE_BLOG_FAIL:
      return createBlogFail(state, payload);

    case actionTypes.EDIT_BLOG:
      return editBlog(state, payload);

    default:
      return state;
  }
};

/*--- CASES ARE HERE DEFINED */

// Case createPost
const createBlog = (state, payload) => {
  // console.log(payload);
  return updateObject(state, {
    loading: false
  });
};
const createBlogFail = (state, payload) => {
  // console.log(payload);
  return updateObject(state, {
    loading: false,
    error: payload.error
  });
};

// Case editPost
const editBlog = (state, payload) => {
  return updateObject(state, {});
};

export default blogReducer;
