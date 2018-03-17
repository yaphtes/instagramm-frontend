import React, { Component } from 'react';
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

  render() {
    const { loaded, article, avatar } = this.state;
    
    if (article && loaded) {
      var { userId, date, content, photoCollection, _id: postId } = article;
      console.log(article)
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
            <CardText>{content}</CardText>
            {photoCollection.length ?
              <Gallery
                items={photoCollection}
                thumbnailPosition="top"
              />
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