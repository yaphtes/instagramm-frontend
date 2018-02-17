import React from 'react';
import { server } from '../variables';
import { Card, CardHeader, CardText, CardMedia } from 'material-ui/Card';

export default function CreaturePreview({ avatar, userId, title, content, preview }) {
  if (preview) {
    preview = URL.createObjectURL(preview);
  }

  return (
    <div className="preview" >
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
    </div>
  );
}

