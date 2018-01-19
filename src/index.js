import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './store';
import App from './components/App';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));