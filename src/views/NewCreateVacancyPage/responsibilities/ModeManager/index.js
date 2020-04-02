import {Page} from '../../../../Page';
import template from './index.pug'

class ModeManager extends Page {

  render() {
    return template(this.props)
  }
}

export {
  ModeManager
}