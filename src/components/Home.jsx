import React, { Fragment, Component } from 'react';
import About from './About';
import Posts from './Posts';

export default class Home extends Component {
  render() {
    return (
      <Fragment>
        <About />
        <Posts />
      </Fragment>
    );
  }
}
