import React, { Component } from 'react';
import PostPreview from './PostPreview';
import { PostsStyled } from './styled';
import { rest } from '../../variables';
import List from '../List';

export default class Posts extends Component {
  state = {
    addingIsOpen: false,
    mySubscriptions: null,
    subscribers: null
  };

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
    const { user } = this.props;
    
    let mySubscriptionsPromises = [];
    let subscribersPromises = [];

    const headers = new Headers();
    headers.append('x-jwt', localStorage.getItem('jwt'));
    user.mySubscriptions.forEach(id => {
      let request = new Request(`${rest}/user-fragment-by-id?id=${id}`, {
        method: 'get',
        headers
      });
      let pr = fetch(request);
      mySubscriptionsPromises.push(pr);
    });

    user.subscribers.forEach(id => {
      let request = new Request(`${rest}/user-fragment-by-id?id=${id}`, {
        method: 'get',
        headers
      });
      let pr = fetch(request);
      subscribersPromises.push(pr);
    });

    Promise.all(mySubscriptionsPromises)
      .then(async responses => {
        mySubscriptionsPromises = [];
        responses.forEach(res => mySubscriptionsPromises.push(res.json()));
        const users = await Promise.all(mySubscriptionsPromises)
        this.setState({ mySubscriptions: users });
      })

    Promise.all(subscribersPromises)
      .then(async responses => {
        subscribersPromises = [];
        responses.forEach(res => subscribersPromises.push(res.json()));
        const users = await Promise.all(subscribersPromises);
        this.setState({ subscribers: users });
      });
  }

  render() {
    const { user, onRemoveSubscription } = this.props;
    const { mySubscriptions, subscribers } = this.state;

    return (
      <PostsStyled>
        <div className="publications">
          {user.posts.map((postId, i) =>
            <div key={i} className="post">
              <PostPreview postId={postId} user={user} />
            </div>
          )}
        </div>
        <div className="subs">
          <List head="My Subscriptions" type="subscriptions" onRemove={onRemoveSubscription} users={mySubscriptions || []} />
          <List head="Subscribes" type="subscribes" users={subscribers || []} />
        </div>
      </PostsStyled>
    );
  }
}