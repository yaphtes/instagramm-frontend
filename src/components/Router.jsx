import React, { Fragment } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import OuterUser from './OuterUser';
import Profile from './Profile';
import Editing from './Editing';
import Login from './Auth/Login';
import Registration from './Auth/Registration';
import ArticleView from './ArticleView';
import Feed from './Feed';

export default function Router() {
  return (
    <Fragment>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/user/:id" component={OuterUser} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/editing" component={Editing} />
        <PrivateRoute path="/post/:postId" component={ArticleView} />
        <PrivateRoute path="/feed" component={Feed} />
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
        <Route render={props => <div>404</div>} />
        <Route />
      </Switch>
    </Fragment>
  );
}