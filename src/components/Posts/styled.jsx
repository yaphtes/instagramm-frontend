import { mainColor } from '../vars';
import { Wrap } from '../extends';

export const PostsStyled = Wrap.extend`
  background-color: ${mainColor};

  .publications {
    max-width: 614px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .post {
    width: 100%;
    margin-bottom: 40px;
  }
`;