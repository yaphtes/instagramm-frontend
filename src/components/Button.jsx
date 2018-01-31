import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

export default function Button({ label, raised, color, backgroundColor, icon: Icon, children, ...rest }) {
  if (raised) {
    return (
      <RaisedButton 
        label={label}
        labelColor={color}
        backgroundColor={backgroundColor}
        style={{ marginTop: '30px' }}
        {...rest}
      />
    );
  } else if (Icon) {
    return (
      <IconButton {...rest}>
        {children}
        <Icon />
      </IconButton>
    );
  }
}