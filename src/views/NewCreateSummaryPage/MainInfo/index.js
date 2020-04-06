import {Page} from '../../../Page';
import template from './index.pug'
class MainInfo extends Page {
  render() {
    return template(this.props);
  }
}