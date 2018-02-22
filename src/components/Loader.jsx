import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styled from 'styled-components';
const LoaderStyled = styled.div`
  position: absolute;
  left: calc(50% - 40px);
  top: calc(50% - 40px);
`;

export default function Loader() {
  return (
    <LoaderStyled>
      <CircularProgress size={80} thickness={5} />;
    </LoaderStyled>
  );
}