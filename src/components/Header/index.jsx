import React from 'react';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';
import './assets/header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <Link to="/" className="logo"><img src={logo} alt="logo"/></Link>
        <div className="search"><input placeholder="Search" type="text"/></div>
        <div className="login-buttons">
          <Link to="/registration">Registration</Link>
          <button>Login</button>
        </div>
      </div>
    </header>
  );
}