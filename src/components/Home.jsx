import React, { Fragment } from 'react';
import About from './About';
import Posts from './Posts';
import Loader from './Loader';
import withSocket from '../hoc/withSocket';

function Home({ isFetching }) {
  return (
    !isFetching ?
      <Fragment>
        <About />
        <Posts />
      </Fragment>
      :
      <Loader/>
  );
}


export default withSocket(Home);