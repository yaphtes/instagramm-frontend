import { FETCHING_CHANGED } from '../variables';

export default function fetching(state = null, { type, payload }) {
  switch(type) {
    case FETCHING_CHANGED:
      return payload;
    
    default:
      return state;
  }
}