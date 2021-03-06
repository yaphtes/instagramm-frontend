import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { GET_USER } from '../../variables';
import { accentColor, mainColor } from '../vars';
import TextField from 'material-ui/TextField';
import Button from '../Button';
import { Auth, Form } from './styled';


class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: ''
    };
  }

  handleLogin = (event) => {
    event.preventDefault();
    const { handleGetUser } = this.props;
    const { username, password } = this.state;
    handleGetUser({ username, password });
  }

  handleChangePassword = ({ target }) => {
    const password = target.value;
    this.setState({ password });
  }
  handleChangeUsername = ({ target }) => {
    const username = target.value;
    this.setState({ username });
  }

  render() {
    const { password, username } = this.state;

    if (localStorage.getItem('jwt')) {
      return <Redirect to="/" />;
    }

    return (
      <Auth>
        <div className="wrap">
          <h3>Log in</h3>
          <Form ref="form" onSubmit={this.handleLogin} fillColor={mainColor}>
            <TextField
              value={username}
              floatingLabelText="Username"
              onChange={this.handleChangeUsername}
              floatingLabelFocusStyle={{ color: accentColor }}
              underlineFocusStyle={{ borderColor: accentColor }}/>
            <TextField
              type="password"
              value={password}
              floatingLabelText="Password"
              onChange={this.handleChangePassword}
              floatingLabelFocusStyle={{ color: accentColor }}
              underlineFocusStyle={{ borderColor: accentColor }}/>
            <Button
              raised={true}
              label="Submit"
              color="#fff"
              type="submit"
              backgroundColor={accentColor}/>
          </Form>
        </div>
      </Auth>
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

export default connect(null, mapDispatchToProps)(Login);
