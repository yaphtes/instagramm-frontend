import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import NavButton from './NavButton';
import { USER_LOGOUTED, accentColor } from '../../variables';
import Create from 'material-ui/svg-icons/content/create';
import Feed from 'material-ui/svg-icons/communication/rss-feed';
import Account from 'material-ui/svg-icons/action/account-circle';
import FlatButton from 'material-ui/FlatButton';
import Home from 'material-ui/svg-icons/action/home';
import { HeaderStyled, WrapStyled } from './styled';


class Header extends Component {
  render() {
    const { handleLogout } = this.props;
    const isAuthenticated = localStorage.getItem('jwt');
  
    return (
      <HeaderStyled>
        <WrapStyled>
          <Link to="/" className="logo" tabIndex="-1">Our Thoughts</Link>
          <div className="search">
            <input placeholder="Search" type="text"/>
            <i className="material-icons">search</i>
          </div>
          <div className="navigation">
            {isAuthenticated ?
                <Fragment>
                  <NavButton to="/" exact={true} component={Home} />
                  <NavButton to="/creating" component={Create} />
                  <NavButton to="/feed" component={Feed} />
                  <NavButton to="/profile" component={Account} />
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

function mapDispatchToProps(dispatch) {
  return {
    handleLogout() {
      dispatch({ type: USER_LOGOUTED });
    }
  };
}

export default withRouter(connect(null, mapDispatchToProps)(Header));