import template from './index.pug';
import './style.sass';
import {Page} from '../../../../Page';

/**
 * Single experience item (subpage for showExperience)
 */
class EducationItem extends Page {
  /**
   * @return{string}
   */
  render() {
    console.log(this.props)
    return template(this.props);
  }
}

export default EducationItem;
