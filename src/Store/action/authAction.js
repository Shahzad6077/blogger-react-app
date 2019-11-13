import * as actionTypesCustom from "./actionTypes";
// import { actionTypes } from "redux-firestore";

export const authInit = () => {
  return {
    type: actionTypesCustom.AUTH_INIT
  };
};
const signupSuccess = data => {
  return {
    type: actionTypesCustom.SIGNUP_SUCCESS,
    payload: { data }
  };
};
const signupFail = error => {
  return {
    type: actionTypesCustom.SIGNUP_FAIL,
    payload: { error }
  };
};
const loginInit = () => {
  return {
    type: actionTypesCustom.LOGIN_INIT
  };
};
const loginSuccess = data => {
  return {
    type: actionTypesCustom.LOGIN_SUCCESS,
    payload: { data }
  };
};
const loginFail = error => {
  return {
    type: actionTypesCustom.LOGIN_FAIL,
    payload: { error }
  };
};

const logoutSucces = obj => {
  return {
    type: actionTypesCustom.LOGOUT_SUCCESS
  };
};

export const signup = (credentials, profile) => {
  return (dispatch, getState, { getFirebase }) => {
    //TODO make Success call to data base.
    dispatch(loginInit());
    const firebase = getFirebase();
    firebase
      .createUser(credentials, profile)
      .then(response => {
        console.log(response);
        dispatch(signupSuccess(response));
      })
      .catch(err => {
        console.log(err);
        dispatch(signupFail(err));
      });
  };
};
export const login = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    //TODO make Success call to data base.
    dispatch(loginInit());
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(loginSuccess(response));
      })
      .catch(err => {
        dispatch(loginFail(err));
      });
  };
};
export const logout = props => {
  return (dispatch, getState, { getFirebase }) => {
    //TODO make Success call to data base.
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(response => {
        dispatch(logoutSucces(response));
        // dispatch({ type: actionTypes.CLEAR_DATA });
        props.history.push("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const seenNotification = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //TODO make Success call to data base.
    // const firebase = getFirebase();
    const firestore = getFirestore();
    firestore
      .update(
        { collection: "notifyUser", doc: data.notifyUserID },
        {
          [`${data.uid}.seen`]: true
        }
      )
      .then(result => {
        console.log("result", result);
        dispatch({ type: actionTypesCustom.SEEN_NOTIFICATION });
      })
      .catch(err => {
        console.log("Error=>", err);
      });
  };
};
