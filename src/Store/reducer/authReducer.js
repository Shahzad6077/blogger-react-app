import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../../assets/utility";
import { message } from "flwww";

const initialState = {
  authError: null,
  authLoading: false
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTH_INIT:
      return updateObject({}, initialState);
    case actionTypes.SIGNUP_SUCCESS:
      message("Successfully signup", "success");
      return updateObject(state, {
        authLoading: false,
        authError: null
      });
    case actionTypes.SIGNUP_FAIL:
      message("error signup", "warning");
      return updateObject(state, {
        authLoading: false,
        authError: payload.error.message
      });
    case actionTypes.LOGIN_INIT:
      return updateObject(state, {
        authLoading: true,
        authError: null
      });
    case actionTypes.LOGIN_SUCCESS:
      message("Successfully login", "success");
      return updateObject(state, {
        authLoading: false,
        authError: null
      });
    case actionTypes.LOGIN_FAIL:
      return updateObject(state, {
        authLoading: false,
        authError: payload.error.message
      });
    case actionTypes.LOGOUT_SUCCESS:
      console.log("logout Successfully");
      return updateObject(state, {
        authLoading: false,
        authError: null
      });
    case actionTypes.SEEN_NOTIFICATION:
      console.log("SEEN_NOTIFICATION Successfully");
      return updateObject(state, { seened: true });
    default:
      return state;
  }
};

export default authReducer;
