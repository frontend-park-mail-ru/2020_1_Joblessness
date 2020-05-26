import {Page} from '../../../../Page';
import template from './index.pug'
import './style.sass'
class Recommendation extends Page {
  render() {
    return template(this.props);
  }
}
export {
  Recommendation
}