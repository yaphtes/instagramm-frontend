import React, { Component } from 'react';
import About from './About';
import { connect } from 'react-redux';
import Posts from './Posts';
import { GET_USER_BY_TOKEN } from '../../variables';

import post1 from './Posts/assets/post1.png';
import post2 from './Posts/assets/post2.png';
import post3 from './Posts/assets/post3.png';
import post4 from './Posts/assets/post4.png';
import post5 from './Posts/assets/post5.png';


class Home extends Component {
  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const { getUserByToken } = this.props;
    getUserByToken(token);
  }

  render() {
    const { username } = this.props;

    const name = 'Firstname';
    const surname = 'Lastname';
    const text = 'Lorem Ipsum - это текст рыба, часто используемый в печати вэб-дизайне. Lorem Ipsum является стандартной http://website.com';
    const posts = [post1, post2, post3, post4, post5, post1, post2, post3, post4, post5, post1, post2];
  
    return (
      <div className="home">
        <About
          username={username}
          name={name}
          surname={surname}
          text={text}
        />
        <Posts posts={posts} />
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  const { username } = user;
  return { username };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserByToken(token) {
      dispatch({ type: GET_USER_BY_TOKEN, payload: token });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);