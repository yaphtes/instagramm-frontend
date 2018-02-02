import { apply, put, call } from 'redux-saga/effects';
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
  POST_ARTICLE_SUCCEEDED,
  POST_ARTICLE_FAILED,
} from '../variables';

// В ОБРАБОТЧИКАХ ДОБАВИТЬ ПРОВЕРКУ НА 401 статус (редирект с сервака, токен закончился)


export function* postArticle({ payload: formData }) {
  try {
    const post = yield call([api, api.postArticle], formData);
    yield put({ type: POST_USER_SUCCEEDED, payload: post });
  } catch (err) {
    yield put({ type: POST_ARTICLE_FAILED, payload: err });
  }
}

export function* deleteAvatar({ payload }) {
  const { id, currentAvatar } = payload;
  try {
    yield apply(api, api.deleteAvatar, [id, currentAvatar]);
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

// TODO: обработать случай, когда пользователь не найден (заблокирован) на бэке
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