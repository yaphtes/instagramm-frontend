import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { history } from './store';
import App from './components/App';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider>
        <App/>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));