import React, { Fragment, Component } from 'react';
import logo from './assets/logo.png';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { USER_LOGOUTED } from '../../variables';
import './assets/header.css';
import ProfileIcon from './assets/ProfileIcon';

class Header extends Component {
  render() {
    let { handleLogout, history } = this.props;
    const isAuthenticated = localStorage.getItem('jwt');
  
    return (
      <header className="header">
        <div className="wrap">
          <Link to="/" className="logo" tabIndex="-1"><img src={logo} alt="logo"/></Link>
          <div className="search"><input placeholder="Search" type="text"/></div>
          <div className="login-buttons">
          {isAuthenticated ?
            <Fragment>
              <ProfileIcon onClick={() => history.push('/profile')} />
              <button onClick={handleLogout}>Log out</button>
            </Fragment>
            :
            <Fragment>
              <Link to="/registration" tabIndex="-1">Sign up</Link>
              <Link to="/login" tabIndex="-1">Log in</Link>
            </Fragment>
          }
          </div>
        </div>
      </header>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogout() {
      dispatch({ type: USER_LOGOUTED });
    }
  };
}

export default withRouter(connect(null, mapDispatchToProps)(Header));