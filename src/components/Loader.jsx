import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styled from 'styled-components';
const LoaderStyled = styled.div`
  position: absolute;
  left: calc(50% - 40px);
  top: calc(50% - 40px);
`;

export default function Loader(props) {
  const size = props.size || 80;
  const thickness = props.thickness || 5;

  return (
    <LoaderStyled style={props.style}>
      <CircularProgress size={size} thickness={thickness} style={props.type === 'inner' ? {position: 'static', display: 'block', margin: 'auto'} : null} />
    </LoaderStyled>
  );
}