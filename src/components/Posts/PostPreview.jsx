import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fileServer, localServer } from '../../variables';
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

class PostPreview extends Component {
  state = {
    preview: null,
    title: '',
    content: '',
    date: '',
    loading: true
  };

  async componentDidMount() {
    const { postId } = this.props;
    const postPreview = await api.getPostPreviewById(postId);
    let { preview, title, content, date } = postPreview;
    if (!preview) preview = null;
    this.setState({ preview, title, content, date, loading: false });
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

  // normalizeContent(content) {
  //   const dots = '...';
  //   const indentAsSymbols = 2;
  //   let maxSymbols = 1020 - dots.length;
  //   const maxSymbolsPerLine = 69;
  //   const paragraphsArr = content.split('\n').filter(paragraph => Boolean(paragraph.trim().length));
  //   const lines = paragraphsArr.length;
  //   maxSymbols -= lines * 2;

  //   let paragraphs = [];
  //   let counter = 0;
  //   paragraphsArr.forEach(item => {
  //     if (counter >= maxSymbols) return;
  //     if (counter + item.length >= maxSymbols) {
  //       const leftSymbols = maxSymbols - counter - indentAsSymbols;
  //       item = item.slice(0, leftSymbols) + dots;
  //     };
      
  //     const spacesAfterParagraph = item.length % maxSymbolsPerLine || 0;

  //     paragraphs.push(item);
  //     counter += item.length;
  //     counter += spacesAfterParagraph;
  //     counter += indentAsSymbols;
  //   });

  //   return paragraphs;
  // }

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

  render() {
    const { user, postId } = this.props;
    const { _id: userId, avatar } = user;
    var { title, content, preview, date, loading } = this.state;
    const styles = {
      cardText: {
        height: '100%',
        textIndent: '16px',
        font: `400 16px/23px ${mainFont}`
      }
    };


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
              <MenuItem style={{ color: 'red' }} onClick={this.handleDeleteArticle}>Remove</MenuItem>
            </IconMenu>
            <CardHeader title={title} titleStyle={{ fontWeight: 700, fontSize: '16px' }} avatar={avatar ? `${fileServer}/${userId}/${avatar}` : null} />
            {preview ?
              <div className="content">
                <CardMedia
                  overlay={<CardText style={styles.cardText}>{this.normalizeContent(content)}</CardText>}
                >
                  <img src={`${fileServer}/${userId}/posts/${postId}/${preview}`} alt=""/>
                </CardMedia>  
              </div>
              :
              <div className="content">
                <CardText style={styles.cardText}>{this.normalizeContent(content, true).map((paragraph, i) => (
                  <div key={i} className="paragraph">{paragraph}</div>
                ))}</CardText>
              </div>
            }
          </Card>
        </PostPreviewStyled>
        : null
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