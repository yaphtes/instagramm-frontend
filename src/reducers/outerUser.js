import { GET_OUTER_USER_BY_ID_SUCCEEDED } from '../variables';

export default function outerUser(state = {}, { type, payload }) {
  switch(type) {
    case GET_OUTER_USER_BY_ID_SUCCEEDED:
      return payload;

    default:
      return state;
  }
}