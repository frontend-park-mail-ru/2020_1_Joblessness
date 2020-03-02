import './style.sass'
import './auth-elements.sass'
import {Page} from '../../Page';
import template from './pug/index4.pug'

class ForthStep extends Page {

  parent = 'signup/employee';
  render() {
    return template();
  }
}

export {ForthStep};
