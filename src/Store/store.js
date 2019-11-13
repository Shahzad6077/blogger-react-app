import { createStore, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";

import { reduxFirestore, getFirestore } from "redux-firestore";

import firebase from "../config/firebaseConfig";

import rootReducer from "./reducer/rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//#. Thunk middleware provide two arguments in returning function.
//#. We can also pass some ewxtra arguments by property withExtraArgument(...) ;

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true,
  firebaseStateName: "firebaseReducer"
  // onAuthStateChanged: (authData, firebase, dispatch) => {
  //   // Clear redux-firestore state if auth does not exist (i.e logout)
  //   if (!authData) {
  //     dispatch({ type: actionTypes.CLEAR_DATA });
  //   }
  // }
};
const initialState = {};

export const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    reactReduxFirebase(firebase, rrfConfig), // pass in firebase instance instead of config
    reduxFirestore(firebase), // <- needed if using firestore
    applyMiddleware(reduxThunk.withExtraArgument({ getFirebase, getFirestore }))
  )
);

// # CONFIG OF REACT-REDUX-FIREBASE
// export const rrfProps = {
//   firebase,
//   config: rrfConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance
// };
