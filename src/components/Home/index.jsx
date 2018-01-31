import React, { Component } from 'react';
import About from '../About';
import { connect } from 'react-redux';
import Posts from '../Posts';
import Loader from '../Loader';

class Home extends Component {
  render() {
    const dataIsLoaded = Boolean(this.props.username);

    const posts = [];
  
    if (dataIsLoaded) {
      return (
        <div className="home">
          <About />
          <Posts posts={posts} />
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

function mapStateToProps({ user }) {
  return { username: user.username }
}


export default connect(mapStateToProps)(Home);