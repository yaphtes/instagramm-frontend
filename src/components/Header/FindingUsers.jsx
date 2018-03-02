import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { withRouter } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import { fileServer } from '../../variables';
import { FindingUsersStyled } from './styled';


class FindingUsers extends Component {
  constructor(props) {
    super(props);
    this.listner = this.listner.bind(this);
  }

  handleClick = (userId) => {
    const { history, onChangeRoute } = this.props;
    history.push(`/user/${userId}`);
    onChangeRoute();
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

export default withRouter(FindingUsers);