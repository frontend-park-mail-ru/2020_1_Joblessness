import {DOMAIN} from './ulils/request';
import {ORGANIZATION} from './CONSTANTS';
// const wsDomain = DOMAIN.replace('https://', 'wss://');
// export default () => {
//   try {
//     const ws = new WebSocket(`${wsDomain}/api/chat`);
//     ws.onopen = (e) => {
//       ws.send('')
//     };
//     ws.onmessage = (...msg) => {
//       try {
//         alert(JSON.parse(msg[0].data).message);
//       } catch (e) {
//         console.log(e)
//       }
//     }
//   } catch (e) {
//     console.log(e)
//   }
// }
const WS_DOMAIN = DOMAIN.replace('https://', 'wss://');

class Socket {
  #ws;
  #url;
  #subs;
  #lastMsg;
  constructor(url) {
    this.#subs = [];
    this.#url = url
    this.createSocket(url);
  }
  createSocket = (url) => new Promise(resolve => {
    const createWs = () => {
      try {
        const socket = new WebSocket(`${WS_DOMAIN}/${url}`);
        socket.onerror = () => {
          // setTimeout(createWs, 5000)
        }
        socket.onopen = () => {
          socket.send('')
          this.#ws = socket;
          socket.onmessage = this.onMessage;
          socket.onclose = this.onClose;
          socket.onerror = this.onError;
          resolve();
        }
      } catch (e) {
      }
    }
    createWs();
  });
  onClose = (c) => {
    this.#subs.forEach(s => s.onMessage?.(c));
  }
  onError = async (e) => {
    await this.createSocket(this.#url);
    this.#ws.onerror = this.onError;
    this.#ws.send(this.#lastMsg)
  };
  onMessage = (m) => {
    const message = JSON.parse(m.data);
    this.#subs.forEach(s => s.onMessage?.(message));
  }
  sendMessage = async (m) => {
    this.#lastMsg = JSON.stringify(m);
    this.#ws.send(this.#lastMsg)
  }
  subscribe = (sub) => {
    this.#subs.push(sub)
  }
  connect = () => {
    try {
      this.#ws.close();
    }catch (e) {
    }
    this.createSocket(this.#url);
  }
}

const ws = new Socket('api/chat');
ws.subscribe({
  onMessage: (m) => {
    if(!m.userTwo && m && m.message) {
      alert(m.message);
    }
  }
});
export default ws