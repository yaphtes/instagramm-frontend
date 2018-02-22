import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';
import api from '../../services/api';
import { Article } from './styled';

export default class ArticleView extends Component {
  state = {
    loaded: false,
    article: null
  };

  async componentDidMount() {
    const { postId } = this.props.match.params;
    const article = await api.getArticleById(postId);
    this.setState({ loaded: true, article });
  }

  render() {
    const { loaded, article } = this.state;
    
    if (loaded) {
      return (
        <Article>
          hELLO
        </Article>
      );
    } else {
      return <Loader/>
    }
  }
}