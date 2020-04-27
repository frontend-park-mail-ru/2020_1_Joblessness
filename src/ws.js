import {DOMAIN} from './ulils/request';
const wsDomain = DOMAIN.replace('http://', 'ws://');
export default () => {
  const ws = new WebSocket(`${wsDomain}/api/chat`);
  ws.onopen = (e) => {
    ws.send('1');
    console.log(e, 'open')
  };
  ws.onmessage = (...msg) => {
    try {
      alert(JSON.parse(msg[0].data).message);
    } catch (e) {
      console.log(e)
    }
  }
}