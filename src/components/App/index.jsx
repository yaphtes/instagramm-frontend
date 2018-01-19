import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Home from '../Home';
import Header from '../Header';
import Footer from '../Footer';
import Profile from '../Profile';
import { Registration, Login } from '../Login';
import './assets/app.css';

export default function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
      </Switch>
      <Footer />
    </div>
  );
}