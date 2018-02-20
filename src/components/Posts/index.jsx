import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostPreview from './PostPreview';
import { PostsStyled } from './styled';

class Posts extends Component {
  state = {
    addingIsOpen: false
  };

  render() {
    const { posts } = this.props;

    return (
      <PostsStyled>
        <div className="publications">
          {posts.map((postId, i) =>
            <div key={i} className="post">
              <PostPreview postId={postId} />
            </div>
          )}
        </div>
      </PostsStyled>
    );
  }
}

function mapStateToProps({ user }) {
  let posts;
  const isMainUser = true;
  if (isMainUser) {
    posts = user.posts;
  } else {
    // посты пользователя с другим id
    posts = [];
  }
  return { posts };
}

export default connect(mapStateToProps)(Posts);