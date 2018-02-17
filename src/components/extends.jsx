import styled from 'styled-components';
import { mainColor } from './vars';

export const Wrap = styled.div`
  width: 935px;
  margin-left: auto;
  margin-right: auto;
`;

export const ResetAutofill = styled.form`
  *:-webkit-autofill {
    box-shadow: 0 0 0px 1000px ${mainColor} inset;
    &:hover, &:focus { box-shadow: 0 0 0px 1000px ${mainColor} inset; }
  }
`;