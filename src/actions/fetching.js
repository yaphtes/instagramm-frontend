import { put } from 'redux-saga/effects';
import { FETCHING } from '../variables';

export function* fetching(payload) {
  yield put({ type: FETCHING, payload });
}