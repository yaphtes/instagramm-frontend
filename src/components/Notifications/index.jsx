import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { NotificationsStyled } from './styled';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.setAttribute('id', 'notifications-portal');
  }

  componentWillMount() {
    document.body.appendChild(this.el);
  }

  render() {
    const { notification } = this.props;

    return ReactDOM.createPortal(
      <NotificationsStyled>
          <Snackbar
            message={notification}
            open={notification ? true : false}
          />
      </NotificationsStyled>,
      this.el
    );  
  }
}

export default connect(
  ({ notification }) => ({
    notification
  })
)(Notifications);