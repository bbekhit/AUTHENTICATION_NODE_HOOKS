import {
  GET_PROFILE,
  GET_PROFILES,
  GET_CURRENT_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_ERRORS,
  ADD_PROFILE
} from "./types";
import axios from "axios";

export const addProfile = data => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post("/api/profile/profile", data, config);
    dispatch({
      type: ADD_PROFILE,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.error;
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
    return error;
  }
};
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.error;
    dispatch({
      type: GET_ERRORS,
      payload: error
    });
    return error;
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile/profiles");

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILES,
      payload: null
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const followProfile = (userId, profileId) => async dispatch => {
  try {
    const res = await axios.put(`/api/profile/follow/${userId}`, {
      userId,
      profileId
    });
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};
export const unFollowProfile = (userId, profileId) => async dispatch => {
  try {
    const res = await axios.put(`/api/profile/unfollow/${userId}`, {
      userId,
      profileId
    });
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};
