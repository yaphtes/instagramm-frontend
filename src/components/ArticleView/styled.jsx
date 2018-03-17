import { Wrap } from '../extends';
import { mainFont } from '../vars';

export const ArticleViewStyled = Wrap.extend`
  margin-top: 40px;
  .content {
    .paragraph {
      margin-bottom: 12px;
      text-indent: 16px;
      font: 400 16px/1.5em ${mainFont};
    }
  }
  .gallery {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;