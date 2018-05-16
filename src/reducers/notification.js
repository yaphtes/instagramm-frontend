import { NOTIFICATION_RECEIVED } from '../variables';

export default function notifications(state = '', { type, payload }) {
  switch(type) {
    case NOTIFICATION_RECEIVED:  
      return payload;

    default:
      return state;
  }
}