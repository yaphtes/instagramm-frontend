import React, { Component } from 'react';
import './assets/posts.css';

export default class Posts extends Component {
  state = {
    addingIsOpen: false
  };

  render() {
    const { posts } = this.props;

    return (
      <section className="posts">
        <div className="wrap">
          <div className="publications">
            {posts.map((url, i) => <div key={i} className="post"><img src={url} alt=""/>}/></div>)}
          </div>
        </div>
      </section>
    );
  }
}