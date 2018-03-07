import { GET_OUTER_USER_BY_ID_SUCCEEDED, GET_OUTER_USER_BY_ID_FAILED } from '../variables';
import api from '../services/api';
import { call, put } from 'redux-saga/effects';

export function* getOuterUserById({ payload }) {
  try {
    const user = yield call([api, api.getOuterUserById], payload);
    yield put({ type: GET_OUTER_USER_BY_ID_SUCCEEDED, payload: user });
  } catch(err) {
    yield put({ type: GET_OUTER_USER_BY_ID_FAILED, payload: err });
  }
}