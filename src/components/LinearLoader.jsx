import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import { accentColor } from './vars';


export default function LinearLoader(props) {
  return (
    <LinearProgress mode="indeterminate" color={accentColor} {...props} />
  );
}