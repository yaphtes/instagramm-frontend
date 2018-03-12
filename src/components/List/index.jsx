import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List as ListUI, ListItem } from 'material-ui/List';
import { withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close'
import { fileServer } from '../../variables';
import { ListStyled } from './styled';
import TextField from 'material-ui/TextField';
import { accentColor } from '../vars';

function List({ type, head, users, history, onRemove }) {
  return (
    <ListStyled>
      <TextField
        hintText={head}
        underlineFocusStyle={{ borderColor: accentColor }}
        style={{marginLeft: '16px', width: '284px'}}
      />
      <ListUI>
        {users.length ?
          users.map(({ id, avatar, username, firstname, lastname }, i) => (
            <ListItem
              key={i}
              leftAvatar={<Avatar src={`${fileServer}/${id}/${avatar}`} />}
              primaryText={firstname ? lastname ? `${firstname} ${lastname}` : firstname : username}
              secondaryText={firstname || lastname ? username : null}
              onClick={() => history.push(`/user/${id}`)}
              rightIconButton={type === 'subscriptions' ?
                <IconButton tooltip="unsubscribe"
                  onClick={onRemove ? onRemove.bind(null, id) : null}>
                  <Close />
                </IconButton> : null}
              />)
          )
          :
          <div className="empty">Empty</div>
        }
      </ListUI>
    </ListStyled>
  );
}

export default withRouter(List);