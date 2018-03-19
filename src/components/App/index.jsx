import React, { Fragment } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Home from '../Home';
import OuterUser from '../OuterUser';
import Header from '../Header';
import Footer from '../Footer';
import Profile from '../Profile';
import Editing from '../Editing';
import Login from '../Auth/Login';
import Registration from '../Auth/Registration';
import ArticleView from '../ArticleView';
import Feed from '../Feed';
import { Content } from './styled';
import 'normalize.css';
import './base.css';
import "react-image-gallery/styles/css/image-gallery.css";


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
          <PrivateRoute path="/user/:id" component={OuterUser} />
          <PrivateRoute path="/feed" component={Feed} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
          <Route render={props => <div>404</div>} />
          <Route />
        </Switch>
      </Content>
      <Footer />
    </Fragment>
  );
}