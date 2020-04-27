import {Page} from '../../../../Page';
import template from './index.pug'
class Summary extends Page {
  render() {
    return template(this.props);
  }
}
export {
  Summary
}