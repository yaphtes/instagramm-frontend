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
import Editing from '../Editing';
import Login from '../Auth/Login';
import Registration from '../Auth/Registration';
import ArticleView from '../ArticleView';
import { Content } from './styled';
import 'normalize.css';
import './base.css';


export default function App() {
  return (
    <Fragment>
      <Content>
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/editing" component={Editing} />
          <PrivateRoute path="/post/:postId" component={ArticleView} />
          <PrivateRoute path="/user/:id" component={Home} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
          <Route render={props => <div>404</div>} />
        </Switch>
      </Content>
      <Footer />
    </Fragment>
  );
}