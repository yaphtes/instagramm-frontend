import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';
import { PUT_USER, DELETE_USER, usernameRegexp } from '../../variables';
import { accentColor } from '../vars';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CheckedIcon from 'material-ui/svg-icons/toggle/radio-button-checked';
import UncheckedIcon from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import { RadioButtonGroup, RadioButton } from 'material-ui/RadioButton';
import { orange600 } from 'material-ui/styles/colors';
import Button from '../Button';
import { ProfileStyled, Form } from './styled';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.usernameRegexp = usernameRegexp;

    this.state = {
      usernameIsValid: true,
      usernameInvalidInfo: ''
    };
  }

  validateUsername = ({ target }) => {
    const username = target.value;
    const regexp = this.usernameRegexp;
    const match = username.match(regexp);

    if (match && match[0] === match.input) {
      this.setState({
        usernameIsValid: true,
        usernameInvalidInfo: ''
      });
    } else {
      this.setState({
        usernameIsValid: false,
        usernameInvalidInfo: `Username do not match the pattern: ${regexp}`
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { usernameIsValid } = this.state;
    const { handlePutUser, id } = this.props;
    const form = this.form;
    const username = form.username.value;
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const about = form.about.value;
    const gender = form.gender.value;

    const user = {
      username,
      firstname,
      lastname,
      gender,
      about,
      id
    };

    if (usernameIsValid) {
      handlePutUser(user);
    }
  }

  handleRemoveUser = () => {
    const { id, deleteUser } = this.props;
    const answer = window.confirm('Confirm user deletion.\nYou will not be able to undo the action.');
    if (answer) {
      deleteUser(id);
    } else return;
  }

  render() {
    const dataIsLoaded = Boolean(this.props.username);
    const { usernameIsValid, usernameInvalidInfo } = this.state;
    const {
      username,
      firstname,
      lastname,
      about,
      gender
    } = this.props;

    if (dataIsLoaded) {
      return (
        <ProfileStyled>
          <h3 className="head">My Profile</h3>
          <Form innerRef={val => this.form = val} onSubmit={this.handleSubmit} fillColor="#fff">
            <TextField
              name="username"
              fullWidth={true}
              defaultValue={username}
              floatingLabelText="Username"
              onChange={this.validateUsername}
              errorStyle={{ color: orange600 }}
              hintText={this.usernameRegexp.toString()}
              underlineFocusStyle={{ borderColor: accentColor }}
              errorText={usernameIsValid ? null : usernameInvalidInfo}
              floatingLabelStyle={usernameIsValid ? null : { color: orange600 }}
              floatingLabelFocusStyle={usernameIsValid ? { color: accentColor } : { color: orange600 }}/>
            <TextField
              name="firstname"
              fullWidth={true}
              defaultValue={firstname}
              floatingLabelText="Firstname"
              floatingLabelFocusStyle={{ color: accentColor }}
              underlineFocusStyle={{ borderColor: accentColor }}/>
            <TextField
              name="lastname"
              fullWidth={true}
              defaultValue={lastname}
              floatingLabelText="Lastname"
              floatingLabelFocusStyle={{ color: accentColor }}
              underlineFocusStyle={{ borderColor: accentColor }}/>
            <TextField
              name="about"
              multiLine={true}
              fullWidth={true}
              defaultValue={about}
              floatingLabelText="About"
              floatingLabelFocusStyle={{ color: accentColor }}
              underlineFocusStyle={{ borderColor: accentColor }}/>
            <div className="gender-title">Gender</div>
            <RadioButtonGroup
              name="gender"
              className="gender"
              defaultSelected={gender || "none"}
              onChange={this.handleChangeGender}>
              <RadioButton
                value="man"
                label="Man"
                checkedIcon={<CheckedIcon style={{ fill: accentColor }} />}
                uncheckedIcon={<UncheckedIcon />}
              />
              <RadioButton
                value="woman"
                label="Woman"
                checkedIcon={<CheckedIcon style={{ fill: accentColor }} />}
                uncheckedIcon={<UncheckedIcon />}
              />
              <RadioButton
                value="none"
                label="None"
                checkedIcon={<CheckedIcon style={{ fill: accentColor }} />}
                uncheckedIcon={<UncheckedIcon />}
              />
            </RadioButtonGroup>
            <Button
              color="#fff"
              raised={true}
              type="submit"
              label="Submit"
              backgroundColor={accentColor}/>
          </Form>
          <FlatButton label="Remove user" className="remove-user" onClick={this.handleRemoveUser} />
        </ProfileStyled>
      );
    } else {
      return <Loader />
    }
  }
}

function mapStateToProps({ user }) {
  return {
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    about: user.about,
    gender: user.gender,
    id: user._id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handlePutUser(user) {
      dispatch({ type: PUT_USER, payload: user });
    },

    deleteUser(id) {
      dispatch({ type: DELETE_USER, payload: id });
    }    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);