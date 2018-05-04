import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import user from './user';
import fetching from './fetching';
import feed, { feedIsIncoming } from './feed';
import outerUser from './outerUser';

export default combineReducers({
  user,
  fetching,
  router,
  feed,
  feedIsIncoming,
  outerUser
});
