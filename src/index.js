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

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => {
      if(reg.installing) {
        console.log('Service worker installing');
      } else if(reg.waiting) {
        console.log('Service worker installed');
      } else if(reg.active) {
        console.log('Service worker active');
      }
      console.log(`Registration succeeded. Scope is: ${reg.scope}`);
    });
}