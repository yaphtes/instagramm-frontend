import { takeLatest } from 'redux-saga/effects';
import { POST_USER,
  GET_USER,
  USER_LOGOUTED,
  GET_USER_BY_TOKEN
} from '../variables';
import {
  postUser,
  getUser,
  logoutUser,
  getUserByToken
} from'./users';

function* watchUserSagas() {
  yield takeLatest(POST_USER, postUser);
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(USER_LOGOUTED, logoutUser);
  yield takeLatest(GET_USER_BY_TOKEN, getUserByToken);
}

export default function* rootSaga() {
  yield watchUserSagas();
}