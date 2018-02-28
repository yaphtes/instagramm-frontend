import { call, put } from 'redux-saga/effects';
import api from '../services/api';

import {
  POST_ARTICLE_SUCCEEDED,
  POST_ARTICLE_FAILED,
  DELETE_ARTICLE_SUCCEEDED,
  DELETE_ARTICLE_FAILED
} from '../variables';

export function* postArticle({ payload: formData }) {
  try {
    const post = yield call([api, api.postArticle], formData);
    yield put({ type: POST_ARTICLE_SUCCEEDED, payload: post });
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