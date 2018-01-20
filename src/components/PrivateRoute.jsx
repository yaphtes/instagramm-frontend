import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { GET_USER_BY_TOKEN } from '../variables';

class PrivateRoute extends Component {
  componentDidMount() {
    const { getUserByToken } = this.props;
    const token = localStorage.getItem('jwt');
    if (token) {
      getUserByToken(token);
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route {...rest} render={props => {
        return localStorage.getItem('jwt') ?
          <Component {...props} />
          :
          <Redirect to="/login" />
      }} />
    );
  }
}

// todo: fix ({ user }) => ({ user }) subscribe
function mapDispatchToProps(dispatch) {
  return {
    getUserByToken(token) {
      dispatch({ type: GET_USER_BY_TOKEN, payload: token });
    }
  };
}

export default connect(null, mapDispatchToProps)(PrivateRoute);