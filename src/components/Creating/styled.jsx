import styled from 'styled-components';
import { Wrap } from '../extends';
import { accentColor, mainShadow } from '../vars';

export const CreatingStyled = Wrap.extend`
  padding-bottom: 5px;

  .head {
    text-align: center;
    font: 700 23px/1.5em var(--main-font);
    color: ${accentColor};
    width: auto;
  }

  form {
    margin-top: 40px;
    margin-bottom: 40px;
    background-color: #fff;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: ${mainShadow};
    .file {
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
    }
  }

  .collection {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .photo {
    max-width: 200px;
    margin: 10px;
    img {
      display: block;
      width: 100%;
    }
  }
`;

export const Toolkits = styled.div`
  max-width: 200px;
  background-color: #fff;
  box-shadow: ${mainShadow};
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
  .file {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
    display: block;
    input { display: none; }
  }
`;