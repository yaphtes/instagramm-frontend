import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Delete from 'material-ui/svg-icons/content/clear';
import Comments from 'material-ui/svg-icons/communication/message';
import Send from 'material-ui/svg-icons/content/send';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import { ToolbarStyled } from './styled';
import { red500 } from 'material-ui/styles/colors';
import { accentColor } from '../vars';
import { connect } from 'react-redux';
import api from '../../services/api';
import { fileServer } from '../../variables';


class Toolbar extends Component {
  state = {
    commentsCount: null,
    commentsIsHidden: true,
    currentCommentInput: '',
    comments: [],
    initCommentsLoaded: false
  }

  normalizeDate(date) {
    function normalize(stuff) {
      return String(stuff).length === 2 ? stuff : '0' + stuff;
    }

    const hours = normalize(date.getHours());
    const minutes = normalize(date.getMinutes());
  
    const day = normalize(date.getDate());
    const month = normalize(date.getMonth() + 1);
    const year = String(date.getFullYear()).slice(2);

    return { hours, minutes, day, month, year };
  }

  async componentWillReceiveProps(nextProps) {
    const { avatar: prevAvatar, username: prevUsername, postId } = this.props;
    const { avatar: nextAvatar, username: nextUsername } = nextProps;
    if (prevAvatar !== nextAvatar || prevUsername !== nextUsername) {
      const comments = await api.getPostCommentsByPostId(postId);
      this.setState({ comments });
    }
  }

  handleClickComments = async () => {
    const { postId } = this.props;
    const { initCommentsLoaded } = this.state;
    if (!initCommentsLoaded) {
      const comments = await api.getPostCommentsByPostId(postId);
      this.setState({ comments, commentsIsHidden: false, initCommentsLoaded: true });
    } else {
      this.setState(state => ({ commentsIsHidden: !state.commentsIsHidden }));
    }
  }

  handleAddComment = async () => {
    const { currentCommentInput: comment } = this.state;
    if (!comment.trim()) return;
    const { avatar, myId, postId, username } = this.props;

    const postedComment = await api.postComment({ comment, avatar, myId, postId, username });
    this.setState(state => ({
      comments: [...state.comments, postedComment],
      commentsCount: state.commentsCount ? state.commentsCount + 1 : this.props.commentsCount + 1
    }));
  }

  async handleDeleteComment(commentId) {
    const { postId } = this.props;
    await api.deleteComment({ commentId, postId });
    this.setState(state => ({
      comments: state.comments.filter(comment => comment._id !== commentId),
      commentsCount: state.comments.length - 1
    }));
  }

  expandComment = (event) => {
    const parent = event.target.closest('[data-elem=list-item]');

    if (parent) {
      const elem = parent.querySelector('div:first-child > div > div:last-child');
      elem.style.height = 'auto';
      elem.style.whiteSpace = 'normal';
    }
  };

  goToUser = (userId, event) => {
    const { history, myId } = this.props;
    event.stopPropagation();

    if (userId === myId) {
      history.push('/');
    } else {
      history.push(`/user/${userId}`);
    }
  };

  render() {
    const {
      favorited,
      likes,
      date: ms,
      commentsCount,
      handleToggleLike,
      myId
    } = this.props;
    const { comments, commentsIsHidden } = this.state;
    const date = new Date(ms);
    const { hours, minutes, day, month, year } = this.normalizeDate(date);
    const freshCommentsCount = !this.state.commentsCount && this.state.commentsCount !== 0 ? commentsCount : this.state.commentsCount;
    return (
      <ToolbarStyled>
        <div className="info">Likes {likes.length}</div>
        <div className="comments">Comments {freshCommentsCount}</div>
        <div className="top-stuffs">
          <div className="functions">
            <IconButton onClick={handleToggleLike}>
              {favorited ?
                <Favorite color={red500}/>
                :
                <FavoriteBorder/>
              }
            </IconButton>
            <IconButton>
              <Comments onClick={this.handleClickComments}/>
            </IconButton>
          </div>
          <div className="date">{hours}:{minutes} {day}.{month}.{year}</div>
        </div>
        {!commentsIsHidden ?
          <Fragment>
            <div className="bottom-stuffs">
              {!comments.length ?
                <div className="empty-comments">Оставьте комментарий первым</div>
                :
                <div className="comments-list">
                  <List>
                    {comments.map(({ _id: commentId, userId, comment, username, avatar }, i) => 
                      <ListItem
                        data-elem="list-item"
                        onClick={this.expandComment}
                        key={i}
                        leftAvatar={
                          <IconButton
                            style={{ padding: 0, border: 0 }}
                            tooltip="go to user">
                            <Avatar onClick={this.goToUser.bind(this, userId)} src={avatar ? `${fileServer}/${userId}/${avatar}`: null} />
                          </IconButton>
                        }
                        primaryText={username}
                        secondaryText={comment}
                        secondaryTextLines={1}
                        rightIconButton={
                          userId === myId ?
                            <IconButton
                              tooltip="Delete comment"
                              onClick={this.handleDeleteComment.bind(this, commentId )}>
                              <Delete />
                            </IconButton>
                            :
                            null
                        }
                      />
                    )}
                  </List>
                </div>
              }
              <div className="put-comments">
                {/* <Avatar src={`${fileServer}/${myId}/${avatar}`} className="avatar" /> */}
                <TextField
                  floatingLabelText="Оставить комментарий"
                  floatingLabelFocusStyle={{ color: accentColor }}
                  underlineFocusStyle={{ borderColor: accentColor }}
                  multiLine={true}
                  className="send-input"
                  value={this.state.currentCommentInput}
                  onChange={event => this.setState({ currentCommentInput: event.target.value })}
                />
                <IconButton className="send-btn" onClick={this.handleAddComment}>
                  <Send color={accentColor} />
                </IconButton>
              </div>
            </div>
          </Fragment>
          :
          null
        }
      </ToolbarStyled>
    );    
  }
}


function mapStateToProps({ user }) {
  return { avatar: user.avatar, myId: user._id, username: user.username };
}

export default connect(mapStateToProps)(withRouter(Toolbar));