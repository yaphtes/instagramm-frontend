import styled from 'styled-components';
import { mainColor } from '../vars';
import { Wrap } from '../extends';

export const PostsStyled = Wrap.extend`
  background-color: ${mainColor};

  .publications {
    max-width: 614px;
    display: flex;
    flex-direction: column;
  }

  .post {
    width: 100%;
    margin-bottom: 40px;
  }
`;

export const PostPreviewStyled = styled.div`
  a { text-decoration: none; }

  .menu {
    position: absolute !important;
    z-index: 2;
    top: 0;
    right: 0;
  }
`;