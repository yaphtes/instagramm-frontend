import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default function Loader() {
  return (
    <CircularProgress
      size={80}
      thickness={5}
    />
  );
}