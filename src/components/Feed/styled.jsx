// import styled from 'styled-components';
import { Wrap } from '../extends';
import { mainFont } from '../vars';
import { grey700 } from 'material-ui/styles/colors';


export const FeedStyled = Wrap.extend`
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  .post-container {
    margin-bottom: 20px;
    max-width: 614px;
    width: 100%;
  }
`;

export const EmptyStyled = Wrap.extend`
  position: relative;
  .text {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    font: 700 20px/1em ${mainFont};
    color: ${grey700};
  }
`;