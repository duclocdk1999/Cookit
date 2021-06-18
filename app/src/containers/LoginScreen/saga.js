import { call, put, takeLatest } from 'redux-saga/effects';
import request, { setAccessToken } from '../../utils/request';
import * as actions from './actions';
import * as constants from './constants';

// call request token api
function* onLogin(action) {
  const requestURL = ``;

  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({
        username: action.username,
        password: action.password,
      }),
    });
    setAccessToken(res);
    yield put(actions.loginSuccess(res));
  } catch (err) {
    console.log('err:', err);
    yield put(actions.loginFailed(err));
  }
}

export default function* authenSaga() {
  yield takeLatest(constants.LOGIN, onLogin);
}

