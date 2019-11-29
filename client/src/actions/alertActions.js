import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType) => dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType }
  });
};

export const removeAlert = () => dispatch => {
  dispatch({
    type: REMOVE_ALERT
  });
};
