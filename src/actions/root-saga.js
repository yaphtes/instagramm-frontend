import { takeLatest } from 'redux-saga/effects';
import {
  POST_USER,
  GET_USER,
  USER_LOGOUTED,
  GET_USER_BY_TOKEN,
  PUT_USER,
  PUT_AVATAR
} from '../variables';
import {
  postUser,
  getUser,
  logoutUser,
  getUserByToken,
  putUser,
  putAvatar
} from'./users';

function* watchUserSagas() {
  yield takeLatest(POST_USER, postUser);
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(USER_LOGOUTED, logoutUser);
  yield takeLatest(GET_USER_BY_TOKEN, getUserByToken);
  yield takeLatest(PUT_USER, putUser);
  yield takeLatest(PUT_AVATAR, putAvatar);
}

export default function* rootSaga() {
  yield watchUserSagas();
}