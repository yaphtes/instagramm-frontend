import styled from 'styled-components';
import { mainColor, mainFont, accentColor } from '../vars';
import { Wrap } from '../extends';

export const Hero = Wrap.extend`
  padding-top: 54px;
  padding-bottom: 54px;
  background-color: ${mainColor};
  display: flex;
`;

export const Avatar = styled.div`
  background-color: rgb(219, 219, 219);
  border-radius: 50%;
  width: 152px;
  height: 152px;
  flex-shrink: 0;
  margin-right: 100px;
  overflow: hidden;
  position: relative;
  > button {
    background-color: transparent;
    outline: none;
    border: 0;
    width: 84px;
    height: 84px;
    left: calc(50% - 42px);
    top: calc(50% - 42px);
    border-radius: 50%;
    display: block;
    position: absolute;
    z-index: 2;
    &:active { transform: translateY(1px); }
    &:hover {
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI2NHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjx0aXRsZS8+PGRlc2MvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMTU3RUZCIiBpZD0iaWNvbi0xMzAtY2xvdWQtdXBsb2FkIj48cGF0aCBkPSJNMTcsMjIgTDI1LjAwMDU2MDEsMjIgQzI3Ljc2MTY3NDUsMjIgMzAsMTkuNzU1ODA0OCAzMCwxNyBDMzAsMTQuOTAzNTgwOSAyOC43MTMyOTA3LDEzLjEwODUwNzUgMjYuODgyODYzMywxMi4zNjU1MTAxIEwyNi44ODI4NjMzLDEyLjM2NTUxMDEgQzI2LjM2MDAyMTcsOS44NzIyNDkzNSAyNC4xNDg2NTQ2LDggMjEuNSw4IEMyMC42MzcxMDE3LDggMTkuODIwNjE1OSw4LjE5ODcxNTc1IDE5LjA5MzgwODMsOC41NTI4ODE2NSBDMTcuODkxMTgxNiw2LjQzMTQ0ODc1IDE1LjYxMjc1NzMsNSAxMyw1IEM5LjEzNDAwNjU2LDUgNiw4LjEzNDAwNjU2IDYsMTIgQzYsMTIuMTM4MTUwOSA2LjAwNDAwMjA3LDEyLjI3NTM2NyA2LjAxMTg5NjYxLDEyLjQxMTUzODggTDYuMDExODk2NjEsMTIuNDExNTM4OCBDNC4yMzk2NTg3NiwxMy4xODE2MDg1IDMsMTQuOTQ5MTMxMSAzLDE3IEMzLDE5Ljc2MTQyMzcgNS4yMzI0OTQxOCwyMiA3Ljk5OTQzOTkyLDIyIEwxNiwyMiBMMTYsMTYgTDEyLjc1LDE5LjI1IEwxMiwxOC41IEwxNi41LDE0IEwyMSwxOC41IEwyMC4yNSwxOS4yNSBMMTcsMTYgTDE3LDIyIEwxNywyMiBaIE0xNiwyMiBMMTYsMjcgTDE3LDI3IEwxNywyMiBMMTYsMjIgTDE2LDIyIFoiIGlkPSJjbG91ZC11cGxvYWQiLz48L2c+PC9nPjwvc3ZnPg==);
      background-repeat: no-repeat;
      background-position: center;
      background-color: ${mainColor};
    }
  }
  > img {
    position: absolute;
    z-index: 1;
    max-width: 100%;  
  }
`;

export const ModalAvatarWrap = styled.div`
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 3;

  .modal-avatar {
    margin: auto;
    padding: 40px 20px;
    border-radius: 17px;
    display: flex;
    width: 400px;
    background-color: ${mainColor};
    flex-direction: column;
    align-items: center;
  }

  h3 {
    margin-top: 0px;
    margin-bottom: 20px;
    font: 700 22px/1.5em ${mainFont};
    color: ${accentColor};
  }

  label, button {
    width: 100%;
    text-align: center;
    background-color: transparent;
    border-radius: 17px;
    margin-bottom: 10px;
    border: 1px solid ${accentColor};
    padding-left: 15px;
    padding-right: 15px;
    font: 700 16px/28px ${mainFont};
    color: ${accentColor};
    outline: none;
    &:hover {
      background-color: ${accentColor};
      color: #fff;
    }
    &:last-child { margin-bottom: 0px; }
    &:active { transform: translateY(1px); }
  }
`;

export const Info = styled.div`
  a {
    color: #3d659d;
    font-weight: 400;
    &:hover { text-decoration: none; }
  }

  > .username {
    margin-bottom: 23px;
    display: flex;
    align-items: center;
    span {
      font: 400 35px ${mainFont};
      color: #4b4f6d;
      margin-right: 22px;
    }
  }
  
  > .text {
    color: #4b4f60;
    margin-bottom: 25px;
    font: 400 17px/24px ${mainFont};
    text-align: justify;
    max-height: 100px;
    overflow: hidden;
    .name {
      font: 700 17px/24px ${mainFont};
      font-weight: 700;
    }
  }
`;