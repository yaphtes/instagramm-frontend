import { FETCHING } from '../variables';

export default function fetching(state = false, { type, payload }) {
  switch(type) {
    case FETCHING:
      return payload;
    
    default:
      return state;
  }
}