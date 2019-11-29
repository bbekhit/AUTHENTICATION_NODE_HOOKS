import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alertActions";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth/");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const signupUser = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/auth/signup", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, "danger"));
    }
    dispatch({
      type: REGISTER_FAIL
    });
    return error;
  }
};

export const signinUser = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth/signin", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, "danger"));
    }
    dispatch({
      type: LOGIN_FAIL
    });
    return error;
  }
};

export const signout = history => dispatch => {
  dispatch({
    type: LOGOUT
  });
  history.push("/");
};
