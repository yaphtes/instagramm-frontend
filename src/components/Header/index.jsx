import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import NavButton from './NavButton';
import { USER_LOGOUTED } from '../../variables';
import { accentColor } from '../vars';
import Create from 'material-ui/svg-icons/content/create';
import Feed from 'material-ui/svg-icons/communication/rss-feed';
import Account from 'material-ui/svg-icons/action/account-circle';
import FlatButton from 'material-ui/FlatButton';
import Home from 'material-ui/svg-icons/action/home';
import FindingUsers from './FindingUsers';
import { HeaderStyled, WrapStyled } from './styled';
import { rest } from '../../variables';


class Header extends Component {
  state = {
    findingUsers: []
  }

  handleChangeSearch = event => {
    const value = event.target.value;
    const { username } = this.props;
    if (this.xhr) this.xhr.abort();
    if (!value.trim()) return this.setState({ findingUsers: [] });
    const xhr = this.xhr = new XMLHttpRequest();
    xhr.open('get', `${rest}/users-by-fragment?fragment=${value}`);
    xhr.setRequestHeader('x-jwt', localStorage.getItem('jwt'));
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status !== 200) return;
      let users = JSON.parse(xhr.response);
      users = users.filter(user => user.username !== username);
      this.setState({ findingUsers: users });
    };
  }

  handleChangeRoute = () => {
    this.refs.search.value = '';
    this.setState({ findingUsers: [] });
  }

  handleCloseModal = () => {
    this.refs.search.value = '';
    this.setState({ findingUsers: [] });
  }

  render() {
    const { handleLogout } = this.props;
    const isAuthenticated = localStorage.getItem('jwt');
    const { findingUsers } = this.state;
  
    return (
      <HeaderStyled>
        <WrapStyled>
          <Link to="/" className="logo" tabIndex="-1">Our Thoughts</Link>
          <div className="search">
            <input onChange={this.handleChangeSearch} ref="search" placeholder="Search" type="text"/>
            <i className="material-icons">search</i>
            <i className="material-icons">cancel</i>
            {findingUsers.length ?
              <FindingUsers
                users={findingUsers}
                onChangeRoute={this.handleChangeRoute}
                onCloseModal={this.handleCloseModal}
              />
              : null
            }
          </div>
          <div className="navigation">
            {isAuthenticated ?
                <Fragment>
                  <NavButton to="/" exact={true} component={Home} tooltip="Home" />
                  <NavButton to="/editing" component={Create} tooltip="Make a post" />
                  <NavButton to="/feed" component={Feed} tooltip="Feed" />
                  <NavButton to="/profile" component={Account} tooltip="Profile" />
                  <FlatButton labelStyle={{ color: accentColor }} label="Log Out" onClick={handleLogout} />
                </Fragment>
                :
                <Fragment>
                  <NavButton to="/registration">Sign Up</NavButton>
                  <NavButton to="/login">Log In</NavButton>
                </Fragment>
              }          
          </div>
        </WrapStyled>
      </HeaderStyled>
    );
  }
}

function mapStateToProps({ user }) {
  return { username: user.username };
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogout() {
      dispatch({ type: USER_LOGOUTED });
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));