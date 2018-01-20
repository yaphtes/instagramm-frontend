import { apply, put } from 'redux-saga/effects';
import { replace, push } from 'react-router-redux';
import api from '../services/api';
import {
  POST_USER_SUCCEEDED,
  POST_USER_FAILED,
  GET_USER_SUCCEEDED,
  GET_USER_FAILED,
  USER_LOGOUTED_SUCCEEDED,
  GET_USER_BY_TOKEN_SUCCEEDED,
  GET_USER_BY_TOKEN_FAILED,
  PUT_USER_SUCCEEDED,
  PUT_USER_FAILED,
  PUT_AVATAR_FAILED,
  PUT_AVATAR_SUCCEEDED
} from '../variables';

export function* putAvatar({ payload }) {
  const { blob, id } = payload;
  try {
    const { avatar } = yield apply(api, api.putAvatar, [blob, id]);
    yield put({ type: PUT_AVATAR_SUCCEEDED, payload: avatar });
  } catch (err) {
    yield put({ type: PUT_AVATAR_FAILED, payload: err });
  }
}

export function* putUser({ payload }) {
  try {
    const user = yield apply(api, api.putUser, [payload]);
    yield put({ type: PUT_USER_SUCCEEDED, payload: user });
    yield put(push('/'));
  } catch (err) {
    yield put({ type: PUT_USER_FAILED, payload: err });
  }
}

export function* postUser({ payload }) {
  try {
    const user = yield apply(api, api.postUser, [payload]);
    localStorage.setItem('jwt', user.hash);
    yield put({ type: POST_USER_SUCCEEDED, payload: user });
    yield put(replace('/'));
  } catch(err) {
    yield put({ type: POST_USER_FAILED, payload: err });
  }
}

export function* getUserByToken({ payload }) {
  try {
    const user = yield apply(api, api.getUserByToken, [payload]);
    yield put({ type: GET_USER_BY_TOKEN_SUCCEEDED, payload: user });
  } catch (err) {
    yield put({ type: GET_USER_BY_TOKEN_FAILED, payload: err });
  }
}

export function* getUser({ payload }) {
  try {
    const user = yield apply(api, api.getUser, [payload]);
    localStorage.setItem('jwt', user.hash);
    yield put({ type: GET_USER_SUCCEEDED, payload: user });
    yield put(replace('/'));
  } catch(err) {
    yield put({ type: GET_USER_FAILED, payload: err });
  }
}

export function* logoutUser() {
  yield put({ type: USER_LOGOUTED_SUCCEEDED });
  yield put(replace('/login'));
  yield apply(localStorage, localStorage.clear);
}