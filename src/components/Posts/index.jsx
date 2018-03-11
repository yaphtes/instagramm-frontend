import React, { Component } from 'react';
import PostPreview from './PostPreview';
import { PostsStyled } from './styled';
import List from '../List';

export default class Posts extends Component {
  state = {
    addingIsOpen: false
  };

  render() {
    const { user } = this.props;
    const users = [
      {
        userId: '5a9425cece62621f7021a55e',
        avatar: 'avatar-33990',
        username: 'colento',
        firstname: 'Alex',
        lastname: 'Fill'
      },
      {
        userId: '5a9425cece62621f7021a55e',
        avatar: 'avatar-33990',
        username: 'summit',
        firstname: 'John',
        lastname: 'Filling'
      }
    ];

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
          <List head="My Subscriptions" type="subscriptions" users={users} />
          <List head="Subscribes" type="subscribes" users={users} />
        </div>
      </PostsStyled>
    );
  }
}