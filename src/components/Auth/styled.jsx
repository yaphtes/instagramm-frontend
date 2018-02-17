import { mainColor, mainFont, accentColor } from '../vars';
import { ResetAutofill } from '../extends';
import styled from 'styled-components';

export const Auth = styled.div`
  background-color: ${mainColor};
  padding-top: 20px;
  padding-bottom: 20px;
  h3 {
    text-align: center;
    font: 700 20px/1em ${mainFont};
    color: ${accentColor};
  }
`;

export const Form = ResetAutofill.extend`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-flow: column;
    align-items: center;
    max-width: 360px;
`;