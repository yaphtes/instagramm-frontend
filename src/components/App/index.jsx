import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Home from '../Home';
import Header from '../Header';
import Footer from '../Footer';
import { Registration, Login } from '../Login';
import './assets/app.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}