import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fileServer, localServer, rest } from '../../variables';
import { Card, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import { withRouter } from 'react-router-dom';
import { PostPreviewStyled } from './styled';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import api from '../../services/api';
import copy from 'copy-to-clipboard';
import { DELETE_ARTICLE } from '../../variables';
import { mainFont } from '../vars';
import Toolbar from './Toolbar';

const styles = {
  cardText: {
    height: '100%',
    textIndent: '16px',
    font: `400 16px/23px ${mainFont}`
  }
};

class PostPreview extends Component {
  state = {
    loading: true,
    isFavorited: false,
    likes: [],
    commentsCount: 0
  };

  async componentDidMount() {
    const { postId, user } = this.props;
    const { likes, commentsCount } = await api.getPostInfoById(postId);

    this.setState({ likes, loading: false, commentsCount });
    if (likes.includes(user._id)) this.setState({ isFavorited: true, likes, commentsCount });
  }

  async componentWillReceiveProps(nextProps) {
    const { postId, user } = nextProps;
    const { likes, commentsCount } = await api.getPostInfoById(postId);
    if (likes.includes(user._id)) {
      this.setState({ isFavorited: true, likes, commentsCount });
    } else {
      this.setState({ isFavorited: false, likes, commentsCount });
    }
  }

  handleRedirectToArticleView = () => {
    const { history, postId } = this.props;
    history.push(`/post/${postId}`);
  }

  handleCopyUrl = () => {
    const { postId } = this.props;
    const url = `${localServer}/post/${postId}`;
    copy(url);
  }

  handleDeleteArticle = () => {
    const { postId, handleDeleteArticleById, user, outerUser } = this.props;
    const userId = !outerUser ? user._id : outerUser._id;
    handleDeleteArticleById({ postId, userId });
  }
  
  deleteLastWord(text) {
    const index = text.lastIndexOf(' ');
    text = text.slice(0, index);
    return text;
  }

  normalizeContent(content, withoutPreview) {
    const maxSymbolsWithPreview = 250;
    const maxSymbolsWithoutPreview = 800;

    if (withoutPreview) {
      let paragraphsArr = content.split('\n').filter(paragraph => Boolean(paragraph.trim().length));
      
      let paragraphs = [];
      let counter = 0;
      for (let paragraph of paragraphsArr) {
        if (counter > maxSymbolsWithoutPreview) break;
        if (counter + paragraph.length > maxSymbolsWithoutPreview) {
          paragraph = paragraph.trim();
          const leftSymbols = maxSymbolsWithoutPreview - counter - 3;
          let item = paragraph.slice(0, leftSymbols);
          item = this.deleteLastWord(item) + '...';
          paragraphs.push(item);
          break;
        }

        paragraph = paragraph.trim();
        counter += paragraph.length;
        paragraphs.push(paragraph);
      }

      return paragraphs;
    } else {
      content = content.slice(0, maxSymbolsWithPreview);
      content = this.deleteLastWord(content) + '...';
      return content;
    }
  }

  handleToggleLike = async () => {
    const { postId, user } = this.props;
    const userId = user._id;
    const request = new Request(`${rest}/likes`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'x-jwt': localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId,
        myId: userId
      })
    });

    const res = await fetch(request);
    const { type, likes } = await res.json();
    if (type === 'added') {
      this.setState({ isFavorited: true, likes });
    } else if (type === 'removed') {
      this.setState({ isFavorited: false, likes });
    }
  }

  render() {
    const { user, outerUser, postId, title, content, date, userId: postUserId, preview, match, postAvatar  } = this.props;
    const { loading, likes, isFavorited, commentsCount } = this.state;
    const avatar = !outerUser ? user.avatar : outerUser.avatar;
    const userId = !outerUser ? user._id : outerUser._id;

    return (
      !loading ?
        <PostPreviewStyled>
          <Card style={{ position: 'relative' }}>
            <IconMenu
              className="menu"
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}>
              <MenuItem onClick={this.handleCopyUrl}>Copy url</MenuItem>
              <MenuItem onClick={this.handleRedirectToArticleView}>Go to article</MenuItem>
              {user._id === postUserId ? <MenuItem style={{ color: 'red' }} onClick={this.handleDeleteArticle}>Remove</MenuItem> : null}
            </IconMenu>
            <CardHeader
              title={title}
              titleStyle={{ fontWeight: 700, fontSize: '16px' }}
              avatar={avatar ? match.path.startsWith('/feed') ? postAvatar ? `${fileServer}/${postUserId}/${postAvatar}` : null : `${fileServer}/${userId}/${avatar}` : null}
            />
            {preview ?
              <div className="content">
                <CardMedia
                  overlay={<CardText style={{ color: '#fff', ...styles.cardText}}>{content ? this.normalizeContent(content) : null}</CardText>}>
                  {match.path.startsWith('/feed') ?
                    <img src={`${fileServer}/${postUserId}/posts/${postId}/${preview}`} alt=""/>
                    :
                    <img src={`${fileServer}/${userId}/posts/${postId}/${preview}`} alt=""/>
                  }
                </CardMedia>  
              </div>
              :
              <div className="content">
                <CardText style={styles.cardText}>{content ? this.normalizeContent(content, true).map((paragraph, i) => (
                  <div key={i} className="paragraph">{paragraph}</div>
                )) : null}</CardText>
              </div>
            }
            <Toolbar
              favorited={isFavorited}
              likes={likes}
              commentsCount={commentsCount}
              date={date}
              handleToggleLike={this.handleToggleLike}
              postId={postId}
            />
          </Card>
        </PostPreviewStyled>
        : null
    );
  }
}

function mapStateToProps({ user, outerUser }) {
  return { user, outerUser };
} 

function mapDispatchToProps(dispatch) {
  return {
    handleDeleteArticleById({ postId, userId }) {
      dispatch({ type: DELETE_ARTICLE, payload: { postId, userId }});
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostPreview));