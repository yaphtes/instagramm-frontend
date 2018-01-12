import React, { Component } from 'react';
import './about.css';

export default class About extends Component {
  componentDidMount() {
    let { text } = this.props;
    text = text.replace(/(http|https):\/\/[\w-_]+\.[\w]+/g, `<a href="$&">$&</a>`);
    let { textElem } = this.refs;
    textElem.innerHTML += text
  }

  render() {
    let { username, name, surname } = this.props;

    return (
      <section className="about">
        <div className="wrap">
          <div className="avatar"></div>
          <div className="info">
            <div className="username">
              <span>{username} </span>
              <button id="follow">follow</button>
            </div>
            <div ref="textElem" className="text">
              <span>{name} </span>
              <span>{surname} </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}