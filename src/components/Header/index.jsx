import React from 'react';
import logo from './assets/logo.png';
import './assets/header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo"><img src={logo} alt="logo"/></div>
        <div className="search"><input placeholder="Search" type="text"/></div>
        <div className="login-buttons">
          <button>Registration</button>
          <button>Login</button>
        </div>
      </div>
    </header>
  );
}