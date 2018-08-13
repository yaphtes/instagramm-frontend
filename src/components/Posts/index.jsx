import React, { Component } from 'react';
import PostPreview from '../PostPreview';
import { connect } from 'react-redux';
import { PostsStyled } from './styled';
import List from '../List';

class Posts extends Component {
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
    const { user, outerUser } = this.props;
    let posts = !outerUser ? user.posts : outerUser.posts;
    if (posts && posts.length) posts = this.sortPostsByDate(posts);
    
    return (
      <PostsStyled>
        <div className="publications">
          {posts.map(({ _id: postId, title, content, date, userId, preview }, i) =>
            <div key={i} className="post">
              <PostPreview
                postId={postId}
                title={title}
                content={content}
                date={date} 
                userId={userId}
                preview={preview}
              />
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

function mapStateToProps({ user, outerUser }) {
  return { user, outerUser };
}

export default connect(mapStateToProps)(Posts);