import './style.sass'
import {Page} from '../../../Page';
import template from './index.pug';
class AddEducation extends Page {
  render() {
    return template(this.props);
  }
}


export {
  AddEducation,
};
