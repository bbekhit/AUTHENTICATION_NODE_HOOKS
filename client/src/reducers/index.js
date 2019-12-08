import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import error from "./errorReducer";
import profile from "./profileReducer";

export default combineReducers({
  alert,
  auth,
  profile,
  error
});
