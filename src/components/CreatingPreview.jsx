import React from 'react';
import { server } from '../variables';
import { Card, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import styled from 'styled-components';

const PreviewStyled = styled.div`
  max-width: 420px;
  margin: 0 auto;
  margin-top: 40px;
`;

export default function CreaturePreview({ avatar, userId, title, content, preview }) {
  if (preview) {
    preview = URL.createObjectURL(preview);
  }

  return (
    <PreviewStyled>
      <Card>
        <CardHeader title={title} titleStyle={{ fontWeight: 700, fontSize: '16px' }} avatar={avatar ? `${server}/${userId}/${avatar}` : null} />
        {preview ?
          <CardMedia overlay={content ? <CardText>{content.length <= 101 ? content : content.slice(0, 101) + '...'}</CardText> : null}>
            <img src={preview} alt=""/>
          </CardMedia>  
          :
          <CardText>{content.length <= 470 ? content : content.slice(0,470) + '...' }</CardText>
        }
      </Card>
    </PreviewStyled>
  );
}

