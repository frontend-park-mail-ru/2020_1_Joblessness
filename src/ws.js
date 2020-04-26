import {DOMAIN} from './ulils/request';
const wsDomain = DOMAIN.replace('http://', 'ws://')
export default () => {
  const ws = new WebSocket(`${wsDomain}/api/chat`, 'Upgrade');
  ws.onopen = (...a) => {
    console.log(a, 'open')
  }
  ws.onmessage = (...a) => {
    console.log(a, 'receive')
  }
}