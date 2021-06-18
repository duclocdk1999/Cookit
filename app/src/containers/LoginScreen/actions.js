import * as constant from './constants';


// LOGIN ACTION
export function login(username, password) {
  return {
    type: constant.LOGIN,
    username,
    password,
  };
}

export function loginSuccess(payload) {
  //will hide
  return {
    type: constant.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailed(error) {
  return {
    type: constant.LOGIN_FAILED,
    error,
  };
}