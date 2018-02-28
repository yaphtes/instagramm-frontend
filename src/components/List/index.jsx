import React from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import { List as ListUI, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close'
import { fileServer } from '../../variables';
import { ListStyled } from './styled';
import TextField from 'material-ui/TextField';
import { accentColor } from '../vars';


export default function List({ type, head, users }) {
  return (
    <ListStyled>
      <TextField
      hintText={head}
      underlineFocusStyle={{ borderColor: accentColor }}
      style={{marginLeft: '16px', width: '284px'}}
      />
      <ListUI>
        {users.map((user) => {
          const {
            userId,
            avatar,
            username,
            firstname,
            lastname
          } = user;
          return <ListItem
            leftAvatar={<Avatar src={`${fileServer}/${userId}/${avatar}`} />}
            primaryText={`${firstname} ${lastname}`}
            secondaryText={username}
            rightIconButton={type === 'subscriptions' ?
              <IconButton tooltip="unsubscribe">
                <Close />
              </IconButton> : null}
          />;
        })}
      </ListUI>
    </ListStyled>
  );
}

// export default connect()(List);