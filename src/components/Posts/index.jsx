import React, { Component } from 'react';
import PostPreview from './PostPreview';
import { PostsStyled } from './styled';
import List from '../List';

export default class Posts extends Component {
  state = {
    addingIsOpen: false,
    mySubscriptions: null,
    subscribers: null
  };
  render() {
    const { user, onRemoveSubscription } = this.props;

    return (
      <PostsStyled>
        <div className="publications">
          {user.posts.map((postId, i) =>
            <div key={i} className="post">
              <PostPreview postId={postId} user={user} />
            </div>
          )}
        </div>
        <div className="subs">
          <List head="My Subscriptions" type="mySubscriptions" onRemove={onRemoveSubscription} />
          <List head="Subscribers" type="subscribers" />
        </div>
      </PostsStyled>
    );
  }
}