import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import { fileServer } from '../../variables';
import { FindingUsersStyled } from './styled';
import { GET_OUTER_USER_BY_ID } from '../../variables';


class FindingUsers extends Component {
  constructor(props) {
    super(props);
    this.listner = this.listner.bind(this);
  }

  handleClick = (userId) => {
    const { history, onChangeRoute, getOuterUserById } = this.props;
    history.push(`/user/${userId}`);
    onChangeRoute();
    getOuterUserById(userId);
  }

  listner({ target }) {
    const { onCloseModal } = this.props;
    if (!target.closest('[data-elem=finding-users-modal]')) {
      onCloseModal();
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.listner);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listner);
  }

  render() {
    const { users } = this.props;
    return (
      <FindingUsersStyled data-elem="finding-users-modal">
        <List>
          {users.map(({ avatar, username, firstname, lastname, _id: userId }, i) => {
            if (!firstname) firstname = '';
            if (!lastname) lastname = '';
            return <ListItem
              key={i}
              onClick={this.handleClick.bind(this, userId)}
              leftAvatar={avatar ? <Avatar src={`${fileServer}/${userId}/${avatar}`} /> : null}
              primaryText={!firstname && !lastname ? username : `${firstname} ${lastname}`}
              secondaryText={firstname || lastname ? username : null}
            />;
          })}
        </List>
      </FindingUsersStyled>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    getOuterUserById(id) {
      dispatch({ type: GET_OUTER_USER_BY_ID, payload: id });
    }
  };
}


export default withRouter(connect(null, mapDispatchToProps)(FindingUsers));