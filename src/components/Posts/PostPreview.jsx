import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fileServer, localServer } from '../../variables';
import { Card, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import { Link, withRouter } from 'react-router-dom';
import { PostPreviewStyled } from './styled';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import api from '../../services/api';
import copy from 'copy-to-clipboard';
import { DELETE_ARTICLE } from '../../variables';

class PostPreview extends Component {
  state = {
    preview: null,
    title: '',
    content: '',
    date: ''
  };

  async componentDidMount() {
    const { postId } = this.props;
    const postPreview = await api.getPostPreviewById(postId);
    let { preview, title, content, date } = postPreview;
    if (!preview) preview = null;
    this.setState({ preview, title, content, date });
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
    const { postId, user, handleDeleteArticleById } = this.props;
    const { _id: userId } = user;
    handleDeleteArticleById({ postId, userId });
  }

  render() {
    const { user, postId } = this.props;
    const { _id: userId, avatar } = user;
    const { title, content, preview } = this.state;

    return (
      <PostPreviewStyled>
        <Card style={{ position: 'relative' }}>
          <IconMenu
            className="menu"
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}>
            <MenuItem onClick={this.handleCopyUrl}>Copy url</MenuItem>
            <MenuItem onClick={this.handleRedirectToArticleView}>Go to article</MenuItem>
            <MenuItem style={{ color: 'red' }} onClick={this.handleDeleteArticle}>Remove</MenuItem>
          </IconMenu>
          <CardHeader title={title} titleStyle={{ fontWeight: 700, fontSize: '16px' }} avatar={avatar ? `${fileServer}/${userId}/${avatar}` : null} />
          {preview ?
            <Link to={`/post/${postId}`}>
              <CardMedia overlay={content ? <CardText>{content.length <= 101 ? content : content.slice(0, 101) + '...'}</CardText> : null}>
                <img src={`${fileServer}/${userId}/posts/${postId}/${preview}`} alt=""/>
              </CardMedia>  
            </Link>
            :
            <Link to={`/post/${postId}`}>
              <CardText>
                {content.length <= 470 ? content : content.slice(0,470) + '...' }
              </CardText>
            </Link>
          }
        </Card>
      </PostPreviewStyled>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleDeleteArticleById({ postId, userId }) {
      dispatch({ type: DELETE_ARTICLE, payload: { postId, userId }});
    }
  };
}

export default withRouter(connect(null, mapDispatchToProps)(PostPreview));