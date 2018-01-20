import React, { Component } from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-autosize-textarea';
import Loader from '../Loader';
import { PUT_USER } from '../../variables';
import './assets/profile.css';

class Profile extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const { handlePutUser, id } = this.props;
    const { usernameElem, firstnameElem, lastnameElem, aboutElem } = this.refs;
    const username = usernameElem.value;
    const firstname = firstnameElem.value;
    const lastname = lastnameElem.value;
    const about = aboutElem.currentValue || '';

    const user = {
      username,
      firstname,
      lastname,
      about,
      id
    };

    handlePutUser(user);
  }

  render() {
    const dataIsLoaded = Boolean(this.props.username);
    const { username, firstname, lastname, about } = this.props;

    if (dataIsLoaded) {
      return (
        <div className="profile">
          <div className="wrap">
            <h3 className="head">My Profile</h3>
            <form className="data" onSubmit={this.handleSubmit}>
              <span>letters and optional numbers, min 6 symbols</span>
              <input ref="usernameElem" type="text" defaultValue={username} placeholder="username" pattern="^([a-zA-Z]+[0-9]*){6,}$" tabIndex="1" />
              <input ref="firstnameElem" type="text" defaultValue={firstname} placeholder="firstname" tabIndex="2" />
              <input ref="lastnameElem" type="text" defaultValue={lastname} placeholder="lastname" tabIndex="3" />
              <Textarea ref="aboutElem" rows={5} defaultValue={about} placeholder="about" tabIndex="4" />
              <input type="submit" value="submit" tabIndex="5" />
            </form>
          </div>
        </div>
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
    id: user._id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handlePutUser(user) {
      dispatch({ type: PUT_USER, payload: user });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);