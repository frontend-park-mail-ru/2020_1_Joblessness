import './style.sass'
import {Page} from '../../../Page';
import template from './index.pug';

class ShowEducationPage extends Page {
  render() {
    return template(this.props)
  }
}

export {
  ShowEducationPage
}