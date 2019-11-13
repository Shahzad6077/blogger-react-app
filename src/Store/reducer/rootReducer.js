import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase/";
import blog from "./blogReducer";
import auth from "./authReducer";

const rootReducer = combineReducers({
  blogReducer: blog,
  firestoreReducer: firestoreReducer,
  firebaseReducer: firebaseReducer,
  authReducer: auth
});

export default rootReducer;
