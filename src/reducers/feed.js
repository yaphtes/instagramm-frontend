import { GET_FEED_SUCCEEDED, FEED_IS_INCOMING_CHANGED } from '../variables';

export default function feed(state = [], { type, payload }) {
  switch(type) {
    case GET_FEED_SUCCEEDED:
      return [...payload];

    default:
      return state;
  }
}

export function feedIsIncoming(state = false, { type, payload }) {
  switch(type) {
    case FEED_IS_INCOMING_CHANGED:
      return payload;
    
      default:
        return state;
  }
}