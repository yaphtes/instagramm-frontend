import styled from 'styled-components';
import { Wrap } from '../extends';
import { accentColor, testFont, mainColor, mainFont } from '../vars';

export const HeaderStyled = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #edeeee;
  .logo{ 
    cursor: default;
    font: 700 28px/1.6em ${testFont};
    color: ${accentColor};
    text-decoration: none;
    outline: none;
    border-radius: 18px;
    background-color: transparent;
    &:hover { text-decoration: underline; }
    &:active { transform: translateY(1px); }
  }

  .search {
    position: relative;
    input {
      width: 216px;
      height: 28px;
      border-radius: 14px;
      border: 1px solid #edeeee;
      background-color: ${mainColor};
      outline: none;
      text-align: center;
      padding-left: 28px;
      padding-right: 20px;
      font: 300 15px/28px ${mainFont};
      color: #84878a;
      &:focus {
        text-align: left;
        background-color: #fff;
        + i.material-icons { left: 8px; }
      }
    }
    i.material-icons {
      position: absolute;
      color: #c9c9c9;
      font-size: 18px;
      top: calc(50% - 9px);
      left: 66px;
    }
  }

  .navigation {
    display: flex;
    align-items: center;
    > * { margin-left: 12px !important; }
  }
`;

export const WrapStyled = Wrap.extend`
  height: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;