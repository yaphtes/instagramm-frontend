import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Comments from 'material-ui/svg-icons/communication/message';
import { ToolbarStyled } from './styled';


export default class Toolbar extends Component {
  state = {
    commentsIsHidden: false
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

  render() {
    const { favorited, likes, date: ms, comments } = this.props;
    const date = new Date(ms);
    const { hours, minutes, day, month, year } = this.normalizeDate(date);

  
    return (
      <ToolbarStyled>
        <div className="info">Likes {likes.length}</div>
        <div className="comments">Comments {comments.length}</div>
        <div className="top-stuffs">
          <div className="functions">
            {favorited ?
              <IconButton><Favorite/></IconButton>
              :
              <IconButton><FavoriteBorder/></IconButton>
            }
            <IconButton><Comments/></IconButton>
          </div>
          <div className="date">{hours}:{minutes} {day}.{month}.{year}</div>
        </div>
      </ToolbarStyled>
    );    
  }
}