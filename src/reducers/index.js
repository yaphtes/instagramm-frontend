import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import user from './user';
import outerUser from './outerUser';
import fetching from './fetching';

export default combineReducers({
  user,
  outerUser,
  fetching,
  router
});
