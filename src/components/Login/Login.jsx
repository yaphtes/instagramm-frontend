import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { GET_USER } from '../../variables';

import './assets/login.css';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleLogin = (event) => {
    event.preventDefault();
    const { handleGetUser } = this.props;
    const { username, password } = this.state;
    handleGetUser({ username, password });
  }

  componentDidMount() {
    if (this.refs.username) {
      this.refs.usernameElem.focus();
    }
  }

  handleChangeField = ({ target }) => {
    this.setState((prevState, props) => ({
      [target.dataset.name]: target.value
    }));
  }

  render() {
    const isAuthenticated = localStorage.getItem('jwt');

    if (isAuthenticated) {
      return <Redirect to="/" />
    }


    return (
      <div className="login">
        <div className="wrap">
          <h3>Sign in</h3>
          <form ref="form" onSubmit={this.handleLogin}>
            <input onChange={this.handleChangeField} ref="usernameElem" type="text" placeholder="username" data-name="username" required tabIndex="1" />
            <input onChange={this.handleChangeField} type="password" placeholder="password" data-name="password" required tabIndex="2" />
            <input type="submit" value="submit" tabIndex="3" />
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleGetUser(user) {
      dispatch({ type: GET_USER, payload: user });
    }
  };
}

export default connect(({ user }) => ({ user }), mapDispatchToProps)(Login);
