import {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import authReducer from "./reducers";

import { getToken, removeToken, setToken } from "./../../utils/index";
import { API_URL } from "../../config";
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REQUEST_LOGIN } from "./types";

const initialState = {
  isLoggedIn: !!getToken(),
  token: getToken(),
  user: null,
  isLoggingIn: false,
  error: null,
};

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(
    (credentials) => {
      dispatch({ type: REQUEST_LOGIN });
      axios
        .post(`${API_URL}/login/`, credentials)
        .then((res) => {
          const user = res?.data?.data?.user;
          const token = res?.data?.data?.token;
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              user,
              token,
            },
          });
          setToken(token);
          // redirect to home
          navigate("/home");
        })
        .catch((err) => {
          dispatch({
            type: LOGIN_FAILURE,
            payload:
              err?.response?.data?.error ||
              "Error occured while logging in.Please try again later",
          });
          removeToken();
        });
    },
    [navigate]
  );

  const logout = useCallback(() => {
    removeToken();
    dispatch({ type: LOGOUT });
    navigate("/");
  }, [navigate]);

  const memoedValue = useMemo(() => {
    return { state, login, logout };
  }, [state, login, logout]);

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};
export default AuthState;

// auth hook
export const useAuth = () => useContext(AuthContext);
