import './style.sass'
import {Page} from '../../../Page';
import template from './index.pug';

class ShowExperiencePage extends Page {
  render() {
    return template(this.props)
  }
}

export {
  ShowExperiencePage
}