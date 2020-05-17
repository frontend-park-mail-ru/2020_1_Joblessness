import {DOMAIN} from './ulils/request';
const wsDomain = DOMAIN.replace('https://', 'wss://');
export default () => {
  try {
    const ws = new WebSocket(`${wsDomain}/api/chat`);
    ws.onopen = (e) => {
      ws.send('')
    };
    ws.onmessage = (...msg) => {
      try {
        alert(JSON.parse(msg[0].data).message);
      } catch (e) {
        console.log(e)
      }
    }
  } catch (e) {
    console.log(e)
  }
}