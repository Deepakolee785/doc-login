import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REQUEST_LOGIN } from "./types";

const authReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return { ...state, isLoggingIn: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        error: action.payload,
        isLoggedIn: false,
        user: null,
        token: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggingIn: false,
        error: null,
        isLoggedIn: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};
export default authReducer;
