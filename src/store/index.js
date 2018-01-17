import initialState from './initialState';
import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../actions/root-saga';
import reducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),
  initialState
);

sagaMiddleware.run(rootSaga);

export default store;