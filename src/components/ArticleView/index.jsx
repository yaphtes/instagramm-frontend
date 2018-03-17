import React, { Component, Fragment } from 'react';
import Loader from '../Loader';
import api from '../../services/api';
import { ArticleViewStyled } from './styled';
import { Card, CardHeader, CardText } from 'material-ui';
import { Avatar } from 'material-ui';
import { fileServer } from '../../variables';
import Gallery from 'react-image-gallery';

export default class ArticleView extends Component {
  state = {
    loaded: false,
    article: {},
    avatar: null
  };

  async componentDidMount() {
    const { postId } = this.props.match.params;
    const article = await api.getArticleById(postId);
    const avatar = await api.getUserAvatarByPostId(postId);
    this.setState({ loaded: true, article, avatar });
  }

  normalizeDate(num) {
    if (num.length < 2) {
      num = 0 + num;
    }

    return num;
  }

  normalizeContent(content) {
    const paragraphs = content.split('\n').filter(paragraph => Boolean(paragraph.trim().length));

    return (
      <Fragment>
        {paragraphs.map((paragraph, i) => (
          <div key={i} className="paragraph">{paragraph}</div>
        ))}
      </Fragment>
    );
  }

  render() {
    const { loaded, article, avatar } = this.state;
    
    if (article && loaded) {
      var { userId, date, content, photoCollection, _id: postId } = article;
      content = this.normalizeContent(content);
      date = new Date(date);
      const year = String(date.getFullYear());
      let month = this.normalizeDate(String(date.getMonth() + 1));
      let day = this.normalizeDate(String(date.getDate()));
      let hours = date.getHours();
      let minutes = date.getMinutes();

      var time = `${hours}:${minutes}`;
      var date = `${year}.${month}.${day}`;
      photoCollection = photoCollection.map(src => ({
        original: `${fileServer}/${userId}/posts/${postId}/collection/${src}`,
        thumbnail: `${fileServer}/${userId}/posts/${postId}/collection/${src}`
      }));
    }

    if (loaded) {
      return (
        <ArticleViewStyled>
          <Card>
            <CardHeader
              title={article.title}
              avatar={<Avatar src={`${fileServer}/${userId}/${avatar}`} size={40} />}
              titleStyle={{ fontWeight: 700, fontSize: '16px' }}
            />
            <CardText className="content">{content}</CardText>
            {photoCollection.length ?
              <div className="gallery">
                <Gallery
                  items={photoCollection}
                  lazyLoad={true}
                  showBullets={true}
                />
              </div>
              : null
            }
          </Card>
        </ArticleViewStyled>
      );
    } else {
      return <Loader/>
    }
  }
}