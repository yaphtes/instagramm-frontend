import initialState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../actions/root-saga';
import reducer from '../reducers';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
  routerMiddleware(history),
  sagaMiddleware
);

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware,
  initialState
);

sagaMiddleware.run(rootSaga);

export { history };
export default store;