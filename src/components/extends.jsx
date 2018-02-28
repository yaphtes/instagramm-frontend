import styled from 'styled-components';

export const Wrap = styled.div`
  width: 970px;
  margin-left: auto;
  margin-right: auto;
`;

export const ResetAutofill = styled.form`
  *:-webkit-autofill {
    box-shadow: 0 0 0px 1000px ${props => props.fillColor} inset;
    &:hover, &:focus { box-shadow: 0 0 0px 1000px ${props => props.fillColor} inset; }
  }
`;