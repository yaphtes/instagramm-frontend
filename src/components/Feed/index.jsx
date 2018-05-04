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
          {feed.map((post, i) => (
            <div className="post-container" key={i}>
              <PostPreview postId={post._id} user={{ _id: post.userId, avatar: post.postAvatar}} />
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