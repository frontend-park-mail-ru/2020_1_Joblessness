import {DOMAIN} from './ulils/request';
const wsDomain = DOMAIN.replace('http://', 'ws://');
export default () => {
  const ws = new WebSocket(`${wsDomain}/api/chat`);
  ws.onopen = (e) => {
  };
  ws.onmessage = (...msg) => {
    try {
      alert(JSON.parse(msg[0].data).message);
    } catch (e) {
      console.log(e)
    }
  }
}