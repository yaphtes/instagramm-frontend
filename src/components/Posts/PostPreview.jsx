import React, { Component } from 'react';
import { connect } from 'react-redux';
import { server } from '../../variables';
import { Card, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import api from '../../services/api';

class PostPreview extends Component {
  state = {
    preview: null,
    title: '',
    content: '',
    date: ''
  };

  async componentDidMount() {
    const { postId, handleGetPostPreview } = this.props;
    const postPreview = await handleGetPostPreview(postId);
    const { preview, title, content, date } = postPreview;
    this.setState({ preview, title, content, date });
  }
  render() {
    const { avatar, userId, postId } = this.props;
    const { title, content, preview } = this.state;
  
    return (
      <div className="preview">
        <Card>
          <CardHeader title={title} titleStyle={{ fontWeight: 700, fontSize: '16px' }} avatar={avatar ? `${server}/${userId}/${avatar}` : null} />
          {preview ?
            <CardMedia overlay={content ? <CardText>{content.length <= 101 ? content : content.slice(0, 101) + '...'}</CardText> : null}>
              <img src={`${server}/${userId}/posts/${postId}/${preview}`} alt=""/>
            </CardMedia>  
            :
            <CardText>{content.length <= 470 ? content : content.slice(0,470) + '...' }</CardText>
          }
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    avatar: user.avatar,
    userId: user._id
  };
}

function mapDispatchToProps() {
  return {
    async handleGetPostPreview(postId) {
      const postPreview = api.getPostPreviewById(postId);
      return postPreview;
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PostPreview);