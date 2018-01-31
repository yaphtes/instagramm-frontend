import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { POST_USER, accentColor, usernameRegexp, passwordRegexp } from '../../variables';
import TextField from 'material-ui/TextField';
import { orange600 } from 'material-ui/styles/colors';
import Button from '../Button';


import './auth.css';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.usernameRegexp = usernameRegexp;
    this.passwordRegexp = passwordRegexp;
    
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      usernameIsValid: true,
      passwordIsValid: true,
      passwordInvalidInfo: "",
      usernameInvalidInfo: ""
    };
  }

  validateUsername() {
    const { username } = this.state;
    const regexp = this.usernameRegexp;
    const match = username.match(regexp);

    if (match && match[0] === match.input) {
      return { usernameIsValid: true, info: null };
    } else {
      return { usernameIsValid: false, info: `Username do not match the pattern: ${regexp}` };
    }
  }

  validatePassword() {
    const { password, confirmPassword } = this.state;
    const regexp = this.passwordRegexp;
    const test = regexp.test(password);

    
    if (!test) {
      return { passwordIsValid: false, info: `Passwords do not match the pattern: ${regexp}` };
    } else if (password !== confirmPassword) {
      return { passwordIsValid: false, info: "Different passwords" };
    } else {
      return { passwordIsValid: true, info: null };
    }
  }

  // TODO: ИСПОЛЬЗОВАТЬ ПАРОЛЬ В HASH`е!!!
  handleSubmit = (event) => {
    event.preventDefault();
    const { usernameIsValid, info : usernameInvalidInfo } = this.validateUsername();
    const { passwordIsValid, info: passwordInvalidInfo }  = this.validatePassword();

    if (!usernameIsValid && !passwordIsValid) {
      return this.setState({ 
        usernameIsValid,
        usernameInvalidInfo,
        passwordIsValid,
        passwordInvalidInfo
      });
    }

    if (!usernameIsValid) {
      return this.setState({ usernameIsValid, usernameInvalidInfo });
    }

    if (!passwordIsValid) {
      return this.setState({ passwordIsValid, passwordInvalidInfo });
    }

    const { username, password } = this.state;
    const { handlePostUser } = this.props;

    handlePostUser({ username, password });
  }

  handleChangeUsername = ({ target }) => {
    this.setState({ username: target.value, usernameIsValid: true });
  }

  handleChangePassword = ({ target }) => {
    this.setState({ password: target.value, passwordIsValid: true });
  }

  handleChangeConfirmPassword = ({target}) => {
    this.setState({ confirmPassword: target.value, passwordIsValid: true });
  }

  render() {
    if (localStorage.getItem('jwt')) {
      return <Redirect to="/" />;
    }

    const {
      username,
      password,
      confirmPassword,
      usernameIsValid,
      usernameInvalidInfo,
      passwordIsValid,
      passwordInvalidInfo
    } = this.state;

    return (
      <div className="reglogin">
        <div className="wrap">
          <h3>Sign up</h3>
          <form onSubmit={this.handleSubmit}>
            <TextField
              value={username}
              fullWidth={true}
              floatingLabelText="Username"
              errorStyle={{ color: orange600 }}
              onChange={this.handleChangeUsername}
              hintText={this.usernameRegexp.toString()}
              underlineFocusStyle={{ borderColor: accentColor }}
              errorText={usernameIsValid ? null : usernameInvalidInfo}
              floatingLabelStyle={usernameIsValid ? null : { color: orange600 }}
              floatingLabelFocusStyle={usernameIsValid ? { color: accentColor } : { color: orange600 }}/>
            <TextField
              type="password"
              fullWidth={true}
              value={password}
              floatingLabelText="Password"
              errorStyle={{ color: orange600 }}
              onChange={this.handleChangePassword}
              hintText={this.passwordRegexp.toString()}
              underlineFocusStyle={{ borderColor: accentColor }}
              errorText={passwordIsValid ? null : passwordInvalidInfo}
              floatingLabelStyle={passwordIsValid ? null : { color: orange600 }}
              floatingLabelFocusStyle={passwordIsValid ? { color: accentColor } : { color: orange600 }}/>
            <TextField
              type="password"
              fullWidth={true}
              value={confirmPassword}
              errorStyle={{ color: orange600 }}
              floatingLabelText="Confirm password"
              hintText={this.passwordRegexp.toString()}
              onChange={this.handleChangeConfirmPassword}
              underlineFocusStyle={{ borderColor: accentColor }}
              errorText={passwordIsValid ? null : passwordInvalidInfo}
              floatingLabelStyle={passwordIsValid ? null : { color: orange600 }}
              floatingLabelFocusStyle={passwordIsValid ? { color: accentColor } : { color: orange600 }}/>
            <Button
              raised={true}
              label="Submit"
              type="submit"
              color="#fff"
              backgroundColor={accentColor}/>
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
