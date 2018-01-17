import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem('jwt');
  
  return (
    <Route {...rest} render={props => (
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    )} />
  );
}

export default connect(({ user }) => ({ user }))(PrivateRoute);