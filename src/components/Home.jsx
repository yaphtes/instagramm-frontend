import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import About from './About';
import Posts from './Posts';

function Home({ user }) {
  return (
    <Fragment>
      <About user={user} />
      <Posts user={user} />
    </Fragment>
  );
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Home);