import { LOGIN_IN_SUCCESS, LOAD_ADMIN, LOGOUT, CHANGE_PASSWORD, UPDATE_PROFILE } from "../type";
import * as api from "../../api";
import setAuthToken from "../../utlils/setAuthToken";
import Notification from "../../utlils/notification";
import AllApplicationErrorHandle from '../../utlils/allApplicationErrorHandle'

// login Action creator
export const logIn = (data) => async (dispatch) => {
  try {
    const res = await api.logIn(data);
    console.log(res)
    if(res.details.scopes.includes('ADMIN')){
      dispatch({ type: LOGIN_IN_SUCCESS, payload: res });
    setAuthToken(res.details.token);
    dispatch(loadAdmin());
    Notification("Login success", "success", 1000);
    }
    else{
      Notification("Invalid credentials", "danger", 1000);
    }
  } catch (error) {
    AllApplicationErrorHandle(error);
  }
};

// load admin Action creator(when login succes than call load admin)
export const loadAdmin = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      const res = await api.loadAdmin();
      dispatch({ type: LOAD_ADMIN, payload: res });
    } catch (error) {
      console.log(error)
      // Notification(error.response.data.msg, "danger", 1000);
    }
  }
};

// logout Action creator
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
    Notification("Logout success", "success", 1000);
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = (data) => async (dispatch) => {
  try {
    const res = await api.changePassword(data);
    dispatch({ type: CHANGE_PASSWORD, payload: res });
  
    Notification("Password change success", "success", 1000);
  } catch (error) {
    AllApplicationErrorHandle(error);
  }
};

export const updateAccount = (data) => async (dispatch) => {
  try {
    const res = await api.updateAccount(data);
    dispatch(loadAdmin())
    Notification("Account Update Success", "success", 1000);
  } catch (error) {
    AllApplicationErrorHandle(error);
  }
};
