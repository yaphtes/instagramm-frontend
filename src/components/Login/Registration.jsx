import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { POST_USER } from '../../variables';

import './assets/registration.css';

class Registration extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: ''
  };

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const { handlePostUser } = this.props;
    handlePostUser({ username, password });
  }

  validatePasswords() {
    let { confirmPasswordElem } = this.refs;
    let { password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      confirmPasswordElem.setCustomValidity('Пароли не совпадают');
    } else {
      confirmPasswordElem.setCustomValidity('');
    }  
  }

  componentDidMount() {
    if (this.refs.username) {
      this.refs.usernameElem.focus();
    }
  }

  handleChangeField({ target }) {
    this.setState((prevState, props) => ({
      [target.dataset.name]: target.value
    }), () => {
      if (target.dataset.name === 'password' || target.dataset.name === 'confirmPassword') {
        this.validatePasswords();
      }  
    });
  }

  render() {
    if (localStorage.getItem('jwt')) {
      return <Redirect to="/" />;
    }

    return (
      <div className="registration">
        <div className="wrap">
          <h3>Sign up</h3>
          <form ref="form" onSubmit={this.handleSubmit.bind(this)}>
            <span>letters and optional numbers, min 6 symbols</span>
            <input onChange={this.handleChangeField.bind(this)} ref="usernameElem" type="text" placeholder="username" data-name="username" required pattern="^([a-zA-Z]+[0-9]*){6,}$" tabIndex="1" />
            <span>letters and numbers, min 6 symbols</span>
            <input onChange={this.handleChangeField.bind(this)} type="password" placeholder="password" data-name="password" required pattern="^[a-zA-Z0-9]{6,}$" tabIndex="2" />
            <span>letters and numbers, min 6 symbols</span>
            <input onChange={this.handleChangeField.bind(this)} ref="confirmPasswordElem" type="password" placeholder="confirm again" data-name="confirmPassword" required tabIndex="3" />
            <input type="submit" value="submit" tabIndex="4" />
          </form>
        </div>
      </div>
    );  
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handlePostUser(user) {
      dispatch({ type: POST_USER, payload: user });
    }
  };
}

export default connect(null, mapDispatchToProps)(Registration);
