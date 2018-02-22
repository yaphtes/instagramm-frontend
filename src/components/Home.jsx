import React, { Fragment } from 'react';
import About from './About';
import { connect } from 'react-redux';
import Posts from './Posts';

function Home({ posts }) {
  return (
    <Fragment>
      <About />
      <Posts posts={posts} />
    </Fragment>
  );
}


function mapStateToProps({ user }) {
  return { posts: user.posts };
}

export default connect(mapStateToProps)(Home);