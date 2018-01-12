import React from 'react';
import './assets/posts.css';

export default function Posts({ posts }) {
  return (
    <section className="posts">
      <div className="wrap">
        <div className="publications">{posts.map((url, i) => <div key={i} className="post"><img src={url} alt={`post-${i}`}/></div>)}</div>
        <button className="load">load more</button>
      </div>
    </section>
  );
}