import * as actionTypes from "./actionTypes";

const createBlogInit = () => {
  return {
    type: actionTypes.CREATE_BLOG_INIT
  };
};
const createBlogSuccess = data => {
  return {
    type: actionTypes.CREATE_BLOG_SUCCESS,
    payload: { data }
  };
};
const createBlogFail = error => {
  return {
    type: actionTypes.CREATE_BLOG_FAIL,
    payload: { error }
  };
};

export const createBlog = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //TODO make Success call to data base.
    return new Promise((resolve, reject) => {
      const firestore = getFirestore();
      const profile = getState().firebaseReducer.profile;
      const authUid = getState().firebaseReducer.auth.uid;
      dispatch(createBlogInit());
      const { content, discription, title, readTime } = data;

      firestore
        .collection("blogs")
        .add({
          content: content ? content : "",
          description: discription ? discription : "",
          title: title ? title : "Unknown Title",
          authorId: authUid,
          authorName: profile.username,
          readTime: readTime ? readTime : "10",
          createdAt: new Date()
        })
        .then(response => {
          dispatch(createBlogSuccess(response));
          const createdBlogKey = response._key.path.segments[1];
          console.log(createdBlogKey);
          resolve(createdBlogKey);
        })
        .catch(err => {
          dispatch(createBlogFail(err));
          reject(err);
        });
    });
  };
};
