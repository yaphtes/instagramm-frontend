import { takeLatest, all } from 'redux-saga/effects';
import {
  POST_USER,
  GET_USER,
  USER_LOGOUTED,
  GET_USER_BY_TOKEN,
  PUT_USER,
  PUT_AVATAR,
  DELETE_AVATAR,
  POST_ARTICLE,
  DELETE_ARTICLE
} from '../variables';
import {
  postUser,
  getUser,
  logoutUser,
  getUserByToken,
  putUser,
  putAvatar,
  deleteAvatar
} from'./users';
import {
  postArticle,
  deleteArticle
} from './posts';

function* watchUserSagas() {
  yield takeLatest(POST_USER, postUser);
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(USER_LOGOUTED, logoutUser);
  yield takeLatest(GET_USER_BY_TOKEN, getUserByToken);
  yield takeLatest(PUT_USER, putUser);
  yield takeLatest(PUT_AVATAR, putAvatar);
  yield takeLatest(DELETE_AVATAR, deleteAvatar);
}

function* watchPostSagas() {
  yield takeLatest(POST_ARTICLE, postArticle);
  yield takeLatest(DELETE_ARTICLE, deleteArticle);
}

export default function* rootSaga() {
  yield all([
    watchUserSagas(),
    watchPostSagas()
  ]);
}