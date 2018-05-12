import React, { Component } from 'react';
import { FeedStyled, EmptyStyled } from './styled';
import { connect } from 'react-redux';
import PostPreview from '../PostPreview';
import Loader from '../Loader';
import { GET_FEED } from '../../variables';

class Feed extends Component {
  state = {
    myId: ''
  };

  componentDidMount() {
    const { myId, getMyFeed } = this.props;
    if (myId) {
      this.setState({ myId }, () => getMyFeed(myId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { myId, getMyFeed } = nextProps;
    if (myId && this.state.myId !== myId) {
      this.setState({ myId }, () => getMyFeed(myId));
    }
  }

  render() {
    const { isFetching, feed } = this.props;

    return (
      !feed.length ?
        <EmptyStyled>
          <div className="text">К сожалению, Ваша лента пуста :(</div>
        </EmptyStyled>
        :
        !isFetching ?
          <FeedStyled>
            {feed.map(({ content, title, _id: postId, date, preview, userId, postAvatar }, i) => (
              <div className="post-container" key={i}>
                <PostPreview
                  postId={postId}
                  title={title}
                  content={content}
                  date={date}
                  preview={preview}
                  userId={userId}
                  postAvatar={postAvatar}
                />
              </div>
            ))}
          </FeedStyled>
          :
          <Loader />
    );
  }
}

function mapStateToProps({ user, feed, feedIsIncoming }) {
  const { _id: myId } = user;
  return {  myId, feed, feedIsIncoming };
}

function mapDispatchToProps(dispatch) {
  return {
    getMyFeed(myId) {
      dispatch({ type: GET_FEED, payload: myId });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);