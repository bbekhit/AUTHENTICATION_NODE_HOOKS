import {
  ADD_PROFILE,
  GET_PROFILES,
  GET_PROFILE,
  GET_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  profiles: [],
  currentUserProfile: null,
  profile: null,
  loading: true
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROFILE:
      return [...state.profiles, action.payload];
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        currentUserProfile: action.payload
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default profileReducer;
