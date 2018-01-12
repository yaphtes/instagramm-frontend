import React from 'react';
import Header from '../Header';
import About from './About';

export default function Home() {
  const username = 'username';
  const name = 'Firstname';
  const surname = 'Lastname';
  const text = 'Lorem Ipsum - это текст рыба, часто используемый в печати вэб-дизайне. Lorem Ipsum является стандартной http://website.com';

  return (
    <div className="home">
      <Header />
      <About
        username={username}
        name={name}
        surname={surname}
        text={text}
      />
    </div>
  );
}