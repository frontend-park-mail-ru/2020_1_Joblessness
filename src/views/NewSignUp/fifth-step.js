import './style.sass'
import './auth-elements.sass'
import {Page} from '../../Page';
import template from './pug/index5.pug'

class FifthStep extends Page {

  parent = 'signup/employee';
  render() {
    return template();
  }
}

export {FifthStep};
