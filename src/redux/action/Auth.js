import axios from "axios";

const LoginRequest = () => {
  return {
    type: "LOGIN_REQUEST",
  };
};

const LoginSuccess = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: data
  };
};

const LoginError = (error) => {
  return {
    type: "LOGIN_ERROR",
    payload: error
  };
};

export const AuthLogin = (formData) => {
  return (dispatch) => {
    dispatch(LoginRequest())
    axios({
      method: "POST",
      url: `http://localhost:5500/api/v1/auth/login`,
      data: {
        username: formData.username,
        password: formData.password,
      }
    }).then((res) => {
      dispatch(LoginSuccess(res.data))
    }).catch((err) => {
      dispatch(LoginError(err.response.data))
    })
  }
}


export const AuthLogout = () => {
  return {
    type: "LOGOUT_SUCCESS"
  };
};