import styled from 'styled-components';
import { mainColor, mainFont, accentColor } from '../vars';
import { Wrap } from '../extends';

export const FooterStyled = styled.footer`
  background-color: ${mainColor};
  color: ${accentColor};
  font: 700 12px/1em ${mainFont};
  text-transform: uppercase;
  padding-top: 50px;
  padding-bottom: 50px;
  height: 112px;
`;

export const WrapStyled = Wrap.extend`
  display: flex;
  justify-content: space-between;
`;