import {Page} from '../../../../Page';
import template from './index.pug';


class Recommendations extends Page {
  render() {
    return template(this.props)
  }
}

export {
  Recommendations
}