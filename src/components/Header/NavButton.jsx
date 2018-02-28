import React, { Component } from 'react';
import { accentColor } from '../vars';
import { NavLink, Route } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  link: {
    display: 'inline-block'
  },

  linkActive: {
    borderBottom: '2px solid #3b8ede'
  },

  container: {
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  icon: {
    color: '#3b8ede',
    width: '48px',
    height: '48px',
    border: '8px solid transparent'
  }
};

export default class NavButton extends Component {
  render() {
    const { component: MyComponent, to, exact, children } = this.props;
    if (MyComponent) {
      return (
        <Route path={to} exact={exact} children={({ match }) => (
          <NavLink
            to={to}
            exact={exact}
            style={styles.link}
            activeStyle={styles.linkActive}>
            <IconButton
              iconStyle={styles.icon}
              style={styles.container}>
              <MyComponent />
            </IconButton>
          </NavLink>
        )} />
      );
    } else {
      return (
        <NavLink to={to} exact={exact} activeStyle={styles.linkActive}>
          <FlatButton labelStyle={{ color: accentColor }} label={children} />
        </NavLink>
      );
    }
  }
}