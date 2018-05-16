import { GET_FEED_SUCCEEDED } from '../variables';

export default function feed(state = [], { type, payload }) {
  switch(type) {
    case GET_FEED_SUCCEEDED:
      return [...payload];

    default:
      return state;
  }
}