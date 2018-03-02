import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { GET_USER_BY_TOKEN, FETCHING } from '../variables';
import Loader from './Loader';


class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem('jwt');
  }

  componentWillReceiveProps() {
    this.token = localStorage.getItem('jwt');
  }

  componentDidMount() {
    const { handleGetUserByToken } = this.props;
    handleGetUserByToken(this.token);
  }

  render() {
    const { fetching, component: Component, ...rest } = this.props;

    if (this.token && !fetching) {
      return <Route {...rest} render={props => <Component {...props} />}/>;
    } else if (this.token && fetching) {
      return <Route {...rest} render={props=> <Loader />} />
    } else {
      return <Redirect to="/login" />;
    }
  }
}

function mapStateToProps({ fetching, isMyUser }) {
  return { fetching, isMyUser };
}

function mapDispatchToProps(dispatch) {
  return {
    handleGetUserByToken(token) {
      dispatch({ type: GET_USER_BY_TOKEN, payload: token });
    },

    setFetching(payload) {
      dispatch({ type: FETCHING, payload });
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));