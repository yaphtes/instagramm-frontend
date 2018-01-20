import { rest } from '../variables';

class Api {
  static instance;

  constructor() {
    if (typeof Api.instance === 'object') return Api.instance;

    this.headers = new Headers();
    this.headers.append('x-jwt', localStorage.getItem('jwt'));

    Api.instance = this;
  }

  putAvatar(blob, id) {
    const { headers } = this;
    this.withBlob();
    this.headers.set('user-id', id);
    const request = new Request(`${rest}/avatar`, {
      method: 'put',
      headers,
      body: blob
    });

    return fetch(request)
      .then(res => res.json())
      .then(url => url)
      .catch(err => { throw err });
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
      .then(res => res.json())
      .then(user => user)
      .catch(err => { throw err });
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
}

const api = new Api();
export default api;
