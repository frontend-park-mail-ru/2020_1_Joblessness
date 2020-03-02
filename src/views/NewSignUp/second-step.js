import './style.sass'
import './auth-elements.sass'
import {Page} from '../../Page';
import template from './pug/index2.pug'

class SecondStep extends Page {

  parent = 'signup/employee';
  render() {
    return template();
  }
}

export {SecondStep};
