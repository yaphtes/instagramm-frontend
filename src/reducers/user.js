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
const defaultState = initialState.user;


// TODO: Обработать фейлы
export default function user(state = defaultState, action) {
  switch (action.type) {
    case POST_ARTICLE_SUCCEEDED:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    case POST_USER_SUCCEEDED:
    case GET_USER_SUCCEEDED:
    case GET_USER_BY_TOKEN_SUCCEEDED:
    case PUT_USER_SUCCEEDED:
    return {
      ...state,
      ...action.payload
    };

    case PUT_AVATAR_SUCCEEDED:
      return {
        ...state,
        avatar: action.payload
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