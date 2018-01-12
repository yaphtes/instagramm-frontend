import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Home from '../Home';
import './assets/app.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Route path="/" component={Home} />
      </div>
    </Router>
  );
}