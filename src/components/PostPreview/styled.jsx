import styled from 'styled-components';
import { mainFont } from '../vars';

export const PostPreviewStyled = styled.div`
  a { text-decoration: none; display: block; }

  .menu {
    position: absolute !important;
    z-index: 2;
    top: 0;
    right: 0;
  }

  .content {
    height: 100%;
    overflow: hidden;
    .paragraph {
      font: 400 16px/23px ${mainFont};
      text-indent: 16px;
    }
  }
`;

export const ToolbarStyled = styled.div`
  padding: 16px 16px 16px 4px;
  .top-stuffs {
    display: flex;
    justify-content: space-between;
    .functions {
      display: inline-flex;
      justify-content: space-between;
    }
    .date {
      margin-top: auto;
      margin-bottom: auto;
      font-size: 14px;
    }
  }

  .bottom-stuffs {
    padding-left: 12px;
    padding-right: 12px;
    font: 400 14px/1em ${mainFont};
    .empty-comments {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .put-comments {
      position: relative;
      .send-input {
        /* margin-left: 56px; */
        /* width: calc(100% - 82px) !important; */
        width: calc(100% - 26px) !important;
      }
      .send-btn {
        position: absolute !important;
        right: -24px;
        bottom: 0;
      }

      .avatar {
        position: absolute;
        left: 0;
        bottom: 8px;
        border-radius: 50%;
      }
    }
  }

  .info, .comments {
    padding-left: 12px;
    padding-right: 12px;
    font: 600 14px/1em ${mainFont};
    margin-bottom: 10px;
  }
`;