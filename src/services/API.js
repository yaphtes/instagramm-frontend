import { rest } from '../variables';

class Api {
  static instance;

  constructor() {
    if (typeof Api.instance === 'object') return Api.instance;

    this.headers = new Headers();
    this.headers.append('x-jwt', localStorage.getItem('jwt'));

    Api.instance = this;
  }

  // todo: change
  toggleLikeArticle(postId, myId) {
    const { headers } = this;
    this.withJson();
    const request = new Request(`${rest}/user-likes`, {
      method: 'put',
      headers,
      body: JSON.stringify({ postId, myId })
    });

    return fetch(request)
      .then(res => res.json())
      .then(favoritedPosts => favoritedPosts)
      .catch(err => { throw err });
  }

  getMyFeed(myId) {
    const { headers } = this;
    this.withJson();
    const request = new Request(`${rest}/feed?myId=${myId}`, {
      method: 'get',
      headers
    });
  
    return fetch(request)
      .then(res => res.json())
      .then(feed => feed)
      .catch(err => { throw err });
  }

  getUserAvatarByPostId(postId) {
    const { headers } = this;
    this.withJson();
    const request = new Request(`${rest}/user-avatar-by-post-id?postId=${postId}`, {
      method: 'get',
      headers
    });

    return fetch(request)
      .then(res => res.json())
      .then(({ avatar }) => avatar)
      .catch(err => { throw err });
  }

  removeSubscription({ myId, subscriptionId }) {
    const { headers } = this;
    this.withJson();
    const request = new Request(`${rest}/remove-subscription`, {
      method: 'delete',
      headers,
      body: JSON.stringify({ myId, subscriptionId })
    });

    return fetch(request)
      .then(res => res.json())
      .then(removedSub => removedSub)
      .catch(err => { throw err });
  }

  addSubscription({ myId, subscriptionId }) {
    const { headers } = this;
    this.withJson();
    const request = new Request(`${rest}/add-subscription`, {
      method: 'post',
      headers,
      body: JSON.stringify({ myId, subscriptionId })
    });

    return fetch(request)
      .then(res => res.json())
      .then(sub => sub)
      .catch(err => { throw err });
  }

  getOuterUserById(id) {
    const { headers } = this;
    this.withUri();
    const request = new Request(`${rest}/outer-user-by-id?id=${id}`, {
      method: 'get',
      headers
    });

    return fetch(request)
      .then(res => res.json())
      .then(outerUser => outerUser)
      .catch(err => { throw err });
  }

  deleteArticle({ postId, userId }) {
    const { headers } = this;
    this.withJson();
    const request = new Request(`${rest}/post`, {
      method: 'delete',
      headers,
      body: JSON.stringify({
        postId,
        userId
      })
    });

    return fetch(request)
      .then(res => res.status)
      .then(status => status)
      .catch(err => { throw err });
  }

  getArticleById(postId) {
    const { headers } = this;
    this.withUri();
    const request = new Request(`${rest}/post?postId=${postId}`, {
      method: 'get',
      headers
    });

    return fetch(request)
      .then(res => res.json())
      .then(article => article)
      .catch(err => { throw err });
  }

  getPostInfoById(postId) {
    const { headers } = this;
    this.withUri();

    const request = new Request(`${rest}/post-info-by-id?postId=${postId}`, {
      method: 'get',
      headers
    });

    return fetch(request)
      .then(res => res.json())
      .then(postPreview => postPreview )
      .catch(err => { throw err });
  }

  postArticle(body) {
    const { headers } = this;
    this.resetHeaders();

    const request = new Request(`${rest}/article`, {
      method: 'post',
      headers,
      body
    });

    return fetch(request)
      .then(res => res.json())
      .then(post => post)
      .catch(err => { throw err });
  }

  deleteAvatar(id, currentAvatar) {
    const { headers } = this;
    this.withJson();
    const request = new Request(`${rest}/avatar`, {
      method: 'delete',
      headers,
      body: JSON.stringify({
        currentAvatar,
        id
      })
    });

    return fetch(request)
      .then(res => res.status)
      .catch(err => { throw err });
  }

  putAvatar(body) {
    const { headers } = this;
    this.resetHeaders();
    const request = new Request(`${rest}/avatar`, {
      method: 'put',
      headers,
      body
    });

    return fetch(request)
      .then(res => res.json())
      .then(({ avatar }) => avatar)
      .catch(console.error);
  }

  putUser(user) {
    const { headers } = this;
    this.withJson();
    const request = new Request(`${rest}/user`, {
      method: 'put',
      headers,
      body: JSON.stringify(user)
    });

    return fetch(request)
      .then(res => res.json())
      .then(user => user)
      .catch(err => { throw err });
  }

  postUser(user) {
    const { headers } = this;
    this.withJson();
    const request = new Request(`${rest}/user`, {
      method: 'post',
      headers,
      body: JSON.stringify(user)
    });

    return fetch(request)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 422) {
          console.log(res.statusText);
        }
      });
  }

  getUserByToken(token) {
    const { headers } = this;
    this.withUri();
    const request = new Request(`${rest}/user-by-token?token=${token}`, {
      method: 'get',
      headers
    });

    return fetch(request)
      .then(res => res.json())
      .then(user => user)
      .catch(err => { throw err });
  }

  deleteUser(id) {
    const { headers } = this;
    this.withJson();
    const request = new Request(`${rest}/user`, {
      method: 'delete',
      headers,
      body: JSON.stringify({ id })
    });

    return fetch(request)
      .then(res => res.status)
      .then(status => status)
      .catch(err => { throw err });
  }

  getUser({ username, password }) {
    const { headers } = this;
    this.withUri();
    const request = new Request(`${rest}/user?username=${username}&password=${password}`, {
      method: 'get',
      headers
    });

    return fetch(request)
      .then(res => res.json())
      .then(user => user)
      .catch(err => { throw err });
  }

  withJson() {
    this.headers.set('Content-Type', 'application/json');
  }

  withUri() {
    this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
  }

  withBlob() {
    this.headers.set('Content-Type', 'application/octet-stream');
  }

  resetHeaders() {
    this.headers.delete('Content-Type');
  }
}

export default new Api();
