import './add-education.sass'
import {Page} from '../../Page';
import template from './pug/addEducation.pug';
class AddEducation extends Page {
  render() {
    return template(this.props);
  }
}


export {
  AddEducation,
};
