import {
  GET_USER_SUCCEEDED,
  GET_USER_BY_TOKEN_SUCCEEDED,
  POST_USER_SUCCEEDED,
  PUT_USER_SUCCEEDED,
  USER_LOGOUTED_SUCCEEDED,
  PUT_AVATAR_SUCCEEDED,
  DELETE_AVATAR_SUCCEEDED,
  POST_ARTICLE_SUCCEEDED,
  DELETE_ARTICLE_SUCCEEDED,
  DELETE_USER_SUCCEEDED,
  ADD_SUBSCRIPTION_SUCCEEDED,
  REMOVE_SUBSCRIPTION_SUCCEEDED
} from '../variables';

import initialState from '../store/initialState';
const { user: initialUser } = initialState;

// TODO: Редьюсер article - в отдельный файл
// TODO: Обработать фейлы
export default function user(state = initialUser, { type, payload }) {
  switch (type) {
    case REMOVE_SUBSCRIPTION_SUCCEEDED:
      return {
        ...state,
        mySubscriptions: state.mySubscriptions.filter(sub => sub._id !== payload._id)
      };

    case ADD_SUBSCRIPTION_SUCCEEDED:
      return {
        ...state,
        mySubscriptions: [...state.mySubscriptions, payload]
      };

    case DELETE_USER_SUCCEEDED:
      return {};

    case DELETE_ARTICLE_SUCCEEDED:
      return {
        ...state,
        posts: state.posts.filter(item => item !== payload)
      };

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