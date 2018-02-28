import { rest } from '../variables';

class Api {
  static instance;

  constructor() {
    if (typeof Api.instance === 'object') return Api.instance;

    this.headers = new Headers();
    this.headers.append('x-jwt', localStorage.getItem('jwt'));

    Api.instance = this;
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

  getPostPreviewById(postId) {
    const { headers } = this;
    this.withUri();

    const request = new Request(`${rest}/post-preview?postId=${postId}`, {
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
      .then(({ postId }) => postId)
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
    console.log(headers.get('x-jwt'));
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
