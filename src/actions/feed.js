import { put, call } from 'redux-saga/effects';
import { GET_FEED_SUCCEEDED, GET_FEED_FAILED, FETCHING } from '../variables';
import api from '../services/api';

export function* getFeed({ payload }) {
  try {
    yield put({ type: FETCHING, payload: true });
    const feed = yield call([api, api.getMyFeed], payload);
    feed.sort((post1, post2) => {
      const date1 = new Date(post1.date).getTime();
      const date2 = new Date(post2.date).getTime();
      return -(date1 - date2);
    });
    yield put({ type: GET_FEED_SUCCEEDED, payload: feed });
    yield put({ type: FETCHING, payload: false });
  } catch (err) {
    yield put({ type: GET_FEED_FAILED, payload: err.message });
  }
}