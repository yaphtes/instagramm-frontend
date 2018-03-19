import React, { Component } from 'react';
import PostPreview from '../PostPreview';
import { PostsStyled } from './styled';
import List from '../List';

export default class Posts extends Component {
  state = {
    addingIsOpen: false,
    mySubscriptions: null,
    subscribers: null
  };

  sortPostsByDate(posts) {
    return [...posts].sort((post1, post2) => {
      const date1 = new Date(post1.date).getTime();
      const date2 = new Date(post2.date).getTime();
      return -(date1 - date2);
    });
  }

  render() {
    const { user } = this.props;
    const posts = this.sortPostsByDate(user.posts);

    return (
      <PostsStyled>
        <div className="publications">
          {posts.map(({ _id: postId }, i) =>
            <div key={i} className="post">
              <PostPreview postId={postId} user={user} />
            </div>
          )}
        </div>
        <div className="subs">
          <List head="My Subscriptions" type="mySubscriptions" />
          <List head="Subscribers" type="subscribers" />
        </div>
      </PostsStyled>
    );
  }
}
