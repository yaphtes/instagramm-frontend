import React, { Fragment } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Home from '../Home';
import Header from '../Header';
import Footer from '../Footer';
import Profile from '../Profile';
import Creating from '../Creating';
import Login from '../Auth/Login';
import Registration from '../Auth/Registration';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styled from 'styled-components';
import { mainColor } from '../vars';
import './app.css';

const Content = styled.div`
  min-height: calc(100vh - 112px);
  background-color: ${mainColor}
`;

export default function App() {
  return (
    <MuiThemeProvider>
      <Fragment>
        <Content>
          <Header />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/creating" component={Creating} />
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Login} />
            <Route render={props => <div>404</div>} />
          </Switch>
        </Content>
        <Footer />
      </Fragment>
    </MuiThemeProvider>
  );
}