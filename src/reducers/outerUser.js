import {
  GET_OUTER_USER_SUCCEEDED,
  GET_USER_FAILED,
  CLEAR_OUTER_USER_SUCCEEDED
} from '../variables';

import initialState from '../store/initialState';
const { outerUser: initialOuterUser } = initialState;


export default function outerUser(state = initialOuterUser, { type, payload }) {
  switch(type) {
    case GET_OUTER_USER_SUCCEEDED:
      return payload;

    case CLEAR_OUTER_USER_SUCCEEDED:
      return null;

    default:
      return state;
  }
}