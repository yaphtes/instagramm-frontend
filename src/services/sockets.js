import { socketServer } from '../variables';

export default class Socket {
  static instance;
  constructor() {
    if (typeof Socket.instance === 'object') {
      return Socket.instance;
    } else {
      Socket.instance = this;
      return this;
    }
  }

  init(id) {
    if (!this.ws && id) {
      this.ws = new WebSocket(`${socketServer}/?uid=${id}`);

      this.ws.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log(data);
      };
    }
  }
}
