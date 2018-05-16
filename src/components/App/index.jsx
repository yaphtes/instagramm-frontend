import React, { Fragment, Component } from 'react';
import Router from '../Router';
import { Content } from './styled';
import Header from '../Header';
import Footer from '../Footer';
import Notifications from '../Notifications';
import 'normalize.css';
import './base.css';
import 'react-image-gallery/styles/css/image-gallery.css';


export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Content>
          <Header />
          <Router />
        </Content>
        <Notifications />
        <Footer />
      </Fragment>
    );
  }
}