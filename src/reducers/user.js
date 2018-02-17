import {
  GET_USER_SUCCEEDED,
  GET_USER_BY_TOKEN_SUCCEEDED,
  POST_USER_SUCCEEDED,
  PUT_USER_SUCCEEDED,
  USER_LOGOUTED_SUCCEEDED,
  PUT_AVATAR_SUCCEEDED,
  DELETE_AVATAR_SUCCEEDED,
  POST_ARTICLE_SUCCEEDED
} from '../variables';

import initialState from '../store/initialState';
const userInitialState = initialState.user;


// TODO: Обработать фейлы
export default function user(state = userInitialState, { type, payload }) {
  switch (type) {
    case POST_ARTICLE_SUCCEEDED:
      return {
        ...state,
        posts: [...state.posts, payload]
      };

    case POST_USER_SUCCEEDED:
    case GET_USER_SUCCEEDED:
    case GET_USER_BY_TOKEN_SUCCEEDED:
    case PUT_USER_SUCCEEDED:
    return {
      ...state,
      ...payload
    };

    case PUT_AVATAR_SUCCEEDED:
      return {
        ...state,
        avatar: payload
      };

    case DELETE_AVATAR_SUCCEEDED:
      return {
        ...state,
        avatar: ""
      };

    case USER_LOGOUTED_SUCCEEDED:
      return {};

    default:
      return state;
  }
}