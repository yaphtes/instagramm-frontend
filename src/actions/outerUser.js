import api from '../services/api';
import { call, put } from 'redux-saga/effects';
import { GET_OUTER_USER_FAILED, GET_OUTER_USER_SUCCEEDED, CLEAR_OUTER_USER_SUCCEEDED } from '../variables';

export function* getOuterUser({ payload }) {
  try {
    const outerUser = yield call([api, api.getOuterUserById], payload);
    yield put({ type: GET_OUTER_USER_SUCCEEDED, payload: outerUser });
  } catch(err) {
    yield put({ type: GET_OUTER_USER_FAILED, payload: err });
  }
}

export function* clearOuterUser() {
  yield put({ type: CLEAR_OUTER_USER_SUCCEEDED });
}