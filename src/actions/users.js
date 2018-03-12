import { put, call } from 'redux-saga/effects';
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
  PUT_AVATAR_SUCCEEDED,
  DELETE_AVATAR_SUCCEEDED,
  DELETE_AVATAR_FAILED,
  DELETE_USER_FAILED,
  DELETE_USER_SUCCEEDED,
  FETCHING,
  ADD_SUBSCRIPTION_FAILED,
  ADD_SUBSCRIPTION_SUCCEEDED,
  REMOVE_SUBSCRIPTION_FAILED,
  REMOVE_SUBSCRIPTION_SUCCEEDED
} from '../variables';


export function* deleteAvatar({ payload }) {
  const { id, currentAvatar } = payload;
  try {
    yield call([api, api.deleteAvatar], id, currentAvatar);
    yield put({ type: DELETE_AVATAR_SUCCEEDED });
  } catch (err) {
    yield put({ type: DELETE_AVATAR_FAILED, payload: err });
  }
}

export function* putAvatar({ payload: formData }) {
  try {
    const avatar = yield call([api, api.putAvatar], formData);
    yield put({ type: PUT_AVATAR_SUCCEEDED, payload: avatar });
  } catch (err) {
    yield put({ type: PUT_AVATAR_FAILED, payload: err });
  }
}

export function* deleteUser({ payload }) {
  try {
    yield call([api, api.deleteUser], payload);
    yield put({ type: DELETE_USER_SUCCEEDED });
    yield call([localStorage, localStorage.removeItem], 'jwt');
  } catch(err) {
    yield put({ type: DELETE_USER_FAILED, payload: err });
  }
}

export function* putUser({ payload }) {
  try {
    const user = yield call([api, api.putUser], payload);
    yield put({ type: PUT_USER_SUCCEEDED, payload: user });
    yield put(push('/'));
  } catch (err) {
    yield put({ type: PUT_USER_FAILED, payload: err });
  }
}

export function* postUser({ payload }) {
  try {
    const user = yield call([api, api.postUser], payload);
    yield call([localStorage, localStorage.setItem], 'jwt', user.hash);
    yield put({ type: POST_USER_SUCCEEDED, payload: user });
    yield put(replace('/'));
  } catch(err) {
    yield put({ type: POST_USER_FAILED, payload: err });
  }
}

// TODO: обработать случай, когда пользователь не найден (заблокирован) на бэке
export function* getUserByToken({ payload }) {
  try {
    yield put({ type: FETCHING, payload: true });
    const user = yield call([api, api.getUserByToken], payload);
    yield put({ type: GET_USER_BY_TOKEN_SUCCEEDED, payload: user });
    yield put({ type: FETCHING, payload: false });
  } catch (err) {
    yield put({ type: GET_USER_BY_TOKEN_FAILED, payload: err });
  }
}

export function* getUser({ payload }) {
  try {
    const user = yield call([api, api.getUser], payload);
    yield call([localStorage, localStorage.setItem], 'jwt', user.hash);
    yield put({ type: GET_USER_SUCCEEDED, payload: user });
    yield put(replace('/'));
  } catch(err) {
    yield put({ type: GET_USER_FAILED, payload: err });
  }
}

export function* logoutUser() {
  yield put({ type: USER_LOGOUTED_SUCCEEDED });
  yield put(replace('/login'));
  yield call([localStorage, localStorage.clear]);
}

export function* addSubscription({ payload }) {
  try {
    yield api.addSubscription(payload);
    yield put({ type: ADD_SUBSCRIPTION_SUCCEEDED, payload: payload.subscriptionId });
  } catch(err) {
    yield put({ type: ADD_SUBSCRIPTION_FAILED, payload: err });
  }
}

export function* removeSubscription({ payload }) {
  try {
    yield api.removeSubscription(payload);
    yield put({ type: REMOVE_SUBSCRIPTION_SUCCEEDED, payload: payload.subscriptionId });
  } catch(err) {
    yield put({ type: REMOVE_SUBSCRIPTION_FAILED, payload: err });
  }
}