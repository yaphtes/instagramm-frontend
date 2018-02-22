import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { GET_USER_BY_TOKEN } from '../variables';
import Loader from './Loader';


class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem('jwt');
  }

  componentDidMount() {
    const { handleGetUserByToken } = this.props;
    handleGetUserByToken(this.token);
  }

  render() {
    const { fetching, component: Component, ...rest } = this.props;

    if (this.token) {
      return <Route {...rest} render={props => (<Component {...props}>
        {fetching ? <Loader /> : null}
      </Component>)}/>;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

function mapStateToProps({ fetching }) {
  return { fetching };
}

function mapDispatchToProps(dispatch) {
  return {
    handleGetUserByToken(token) {
      dispatch({ type: GET_USER_BY_TOKEN, payload: token });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);