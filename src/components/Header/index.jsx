import React, { Fragment } from 'react';
import logo from './assets/logo.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { USER_LOGOUTED } from '../../variables';
import './assets/header.css';

function Header({ handleLogout }) {
  const isAuthenticated = localStorage.getItem('jwt');

  return (
    <header className="header">
      <div className="wrap">
        <Link to="/" className="logo" tabIndex="-1"><img src={logo} alt="logo"/></Link>
        <div className="search"><input placeholder="Search" type="text"/></div>
        <div className="login-buttons">
        {isAuthenticated ?
          <button onClick={handleLogout}>Sign out</button>
          :
          <Fragment>
            <Link to="/registration" tabIndex="-1">Sign up</Link>
            <Link to="/login" tabIndex="-1">Sign in</Link>
          </Fragment>
        }
        </div>
      </div>
    </header>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogout() {
      dispatch({ type: USER_LOGOUTED });
    }
  };
}

export default connect(({ user }) => ({ user }), mapDispatchToProps)(Header);