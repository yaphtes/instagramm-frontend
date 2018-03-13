import styled from 'styled-components';
import { mainFont } from '../vars';


export const ListStyled = styled.div`
  margin-bottom: 20px;
  .empty {
    padding-left: 16px;
    text-align: center;
    font: 400 16px/1.5em ${mainFont};
    color: rgba(0, 0, 0, 0.3);
  }

  .list {
    position: relative;
    min-height: 52px;
  }
`;