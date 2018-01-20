import React, { Component } from 'react';
import About from './About';
import { connect } from 'react-redux';
import Posts from './Posts';
import Loader from '../Loader';

import post1 from './Posts/assets/post1.png';
import post2 from './Posts/assets/post2.png';
import post3 from './Posts/assets/post3.png';
import post4 from './Posts/assets/post4.png';
import post5 from './Posts/assets/post5.png';

class Home extends Component {
  render() {
    const dataIsLoaded = Boolean(this.props.username);
    const { username, firstname, lastname, about, avatar } = this.props;

    const posts = [post1, post2, post3, post4, post5, post1, post2, post3, post4, post5, post1, post2];
  
    if (dataIsLoaded) {
      return (
        <div className="home">
          <About
            username={username}
            firstname={firstname}
            lastname={lastname}
            about={about}
            avatar={avatar}
          />
          <Posts posts={posts} />
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

function mapStateToProps({ user }) {
  const { username, firstname, lastname, about, avatar } = user;
  return {
    username,
    firstname,
    lastname,
    about,
    avatar
  };
}


export default connect(mapStateToProps)(Home);