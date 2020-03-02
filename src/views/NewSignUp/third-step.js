import './style.sass'
import './auth-elements.sass'
import {Page} from '../../Page';
import template from './pug/index3.pug'

class ThirdStep extends Page {

  parent = 'signup/employee';
  render() {
    return template();
  }
}

export {ThirdStep};
