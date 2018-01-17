import {
  GET_USER_SUCCEEDED,
  GET_USER_BY_TOKEN_SUCCEEDED,
  POST_USER_SUCCEEDED,
  USER_LOGOUTED_SUCCEEDED
} from '../variables';


// TODO: Обработать фейлы
export default function user(state = {}, action) {
  switch (action.type) {
    case POST_USER_SUCCEEDED:
    case GET_USER_SUCCEEDED:
    case GET_USER_BY_TOKEN_SUCCEEDED:
      return { ...action.payload };

    case USER_LOGOUTED_SUCCEEDED:
      return {};

    default:
      return state;
  }
}