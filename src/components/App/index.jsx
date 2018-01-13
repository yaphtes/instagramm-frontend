import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from '../Home';
import Registration from '../Registration';
import Header from '../Header';
import Footer from '../Footer';
import './assets/app.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/registration" component={Registration} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}