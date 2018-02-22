import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import user, { isMyUser } from './user';
import fetching from './fetching';

export default combineReducers({
  user,
  isMyUser,
  fetching,
  router
});
