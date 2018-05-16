import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga'
import api from '../services/api';

import {
  POST_ARTICLE_SUCCEEDED,
  POST_ARTICLE_FAILED,
  DELETE_ARTICLE_SUCCEEDED,
  DELETE_ARTICLE_FAILED,
  NOTIFICATION_RECEIVED
} from '../variables';

export function* postArticle({ payload: formData }) {
  try {
    const post = yield call([api, api.postArticle], formData);
    yield put({ type: POST_ARTICLE_SUCCEEDED, payload: post });
    yield put({ type: NOTIFICATION_RECEIVED, payload: 'Post created' });
    yield delay(1200);
    yield put({ type: NOTIFICATION_RECEIVED, payload: '' });
  } catch (err) {
    yield put({ type: POST_ARTICLE_FAILED, payload: err });
  }
}

export function* deleteArticle({ payload }) {
  const { postId, userId } = payload;
  try {
    yield call([api, api.deleteArticle], { postId, userId });
    yield put({ type: DELETE_ARTICLE_SUCCEEDED, payload: postId });
  } catch (err) {
    yield put({ type: DELETE_ARTICLE_FAILED, payload: err });
  }
}