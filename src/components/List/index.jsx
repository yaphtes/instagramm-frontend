import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import { List as ListUI, ListItem } from 'material-ui/List';
import { withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import { connect } from 'react-redux';
import { fileServer } from '../../variables';
import { ListStyled } from './styled';
import TextField from 'material-ui/TextField';
import { accentColor } from '../vars';
import { REMOVE_SUBSCRIPTION } from '../../variables';


class List extends Component {
  state = {
    users: this.props.type === 'mySubscriptions' ? this.props.mySubscriptions : this.props.subscribers
  }

  componentWillReceiveProps(nextProps) {
    const { type } = this.props;
    const users = type === 'mySubscriptions' ? nextProps.mySubscriptions : nextProps.subscribers;
    this.setState({ users });
  }

  handleSearchUsers = ({ target }) => {
    const { type, mySubscriptions, subscribers } = this.props;
    const { value } = target;

    const users = type === 'mySubscriptions' ?
      mySubscriptions.filter(this.getList.bind(this, value))
      :
      subscribers.filter(this.getList.bind(this, value));

    this.setState({ users });
  }

  getList(value, item) {
    return item.username.includes(value) || item.firstname.includes(value) || item.lastname.includes(value);
  }

  handleRemoveSubscription = (id) => {
    const { removeSubscription, user } = this.props;
    removeSubscription(user._id, id);

  }

  render() {
    const { type, head, history } = this.props;
    const { users } = this.state;

    return (
      <ListStyled>
        <TextField
          hintText={head}
          underlineFocusStyle={{ borderColor: accentColor }}
          style={{marginLeft: '16px', width: '284px'}}
          onChange={this.handleSearchUsers}
        />
        <div className="list">
          <ListUI>
            {users.length ?
              users.map(({ _id: id, avatar, firstname, lastname, username }, i) => <ListItem
                key={id}
                leftAvatar={<Avatar src={avatar ? `${fileServer}/${id}/${avatar}` : null} />}
                primaryText={firstname ? lastname ? `${firstname} ${lastname}` : firstname : username}
                secondaryText={firstname || lastname ? username : null}
                onClick={() => history.push(`/user/${id}`)}
                rightIconButton={type === 'mySubscriptions' ?
                <IconButton tooltip="unsubscribe"
                  onClick={this.handleRemoveSubscription.bind(this, id)}>
                  <Close />
                </IconButton> : null}
              />)
              :
              <div className="empty">Empty</div>
            }
          </ListUI>        
        </div>
      </ListStyled>
    );
  }
}


function mapStateToProps({ user }) {
  const { mySubscriptions, subscribers } = user;

  return {
    mySubscriptions,
    subscribers,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeSubscription(myId, subscriptionId) {
      dispatch({ type: REMOVE_SUBSCRIPTION, payload: { myId, subscriptionId } });
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));