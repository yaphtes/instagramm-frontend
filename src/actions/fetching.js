import { put } from 'redux-saga/effects';
import { FETCHING_CHANGED } from '../variables';

export function* fetching({ payload }) {
  yield put({ type: FETCHING_CHANGED, payload });
}