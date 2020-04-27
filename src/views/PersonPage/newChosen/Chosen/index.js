import {Page} from '../../../../Page';
import template from './index.pug'

class Chosen extends Page {
  render() {
    return template(this.props);
  }
}
export {
  Chosen
}