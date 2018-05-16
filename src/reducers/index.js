import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import user from './user';
import fetching from './fetching';
import feed from './feed';
import outerUser from './outerUser';
import notification from './notification';

export default combineReducers({
  user,
  fetching,
  router,
  feed,
  outerUser,
  notification
});
