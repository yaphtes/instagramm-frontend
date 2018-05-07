import React, { Component } from 'react';
import { FeedStyled } from './styled';
import { connect } from 'react-redux';
import PostPreview from '../PostPreview';
import Loader from '../Loader';
import LinearLoader from '../LinearLoader';
import { GET_FEED } from '../../variables';

const styles = {
  loader: {
    position: 'absolute',
    top: '18px',
    maxWidth: '48px'
  }
};

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
    const { isFetching, feed, feedIsIncoming } = this.props;

    return (
      !isFetching && feed.length ?
        <FeedStyled>
          {feedIsIncoming ? <LinearLoader style={styles.loader} /> : null}
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