import React, { Component } from 'react';
// import Socket from '../services/sockets';

export default function withSocket(WrappedComponent) {
  return class extends Component {
    // componentWillReceiveProps() {
    //   const id = this.props.user._id;
    //   const socket = new Socket();
    //   socket.init(id);
    // }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }
}