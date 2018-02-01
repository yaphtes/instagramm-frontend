import { rest } from '../variables';

class Api {
  static instance;

  constructor() {
    if (typeof Api.instance === 'object') return Api.instance;

    this.headers = new Headers();
    this.headers.append('x-jwt', localStorage.getItem('jwt'));

    Api.instance = this;
  }


  // postArticle(userId, article) {
  //   return new Promise((resolve, reject) => {
  //     const { title, content, preview, collection } = article;
  //     const { headers } = this;

  //     const body = new FormData();

  //     body.set('title', title);
  //     body.set('content', content);
  //     body.set('preview', preview);

  //     for (let file of collection) {
  //       body.append('collection', file);
  //     };
  //     const request = new Request(`${rest}/article`, {
  //       method: 'post',
  //       headers,
  //       body
  //     });

  //     fetch(request)
  //   });
  // }

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
          // TODO: обработать
          console.log(res.statusText);
        }
      })
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

  resetHeaders() {
    this.headers.delete('Content-Type');
  }
}

const api = new Api();
export default api;
