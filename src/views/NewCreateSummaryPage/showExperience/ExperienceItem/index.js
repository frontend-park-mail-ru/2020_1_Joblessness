import template from './index.pug';
import './style.sass';
import {Page} from '../../../../Page';

/**
 * Single experience item (subpage for showExperience)
 */
class ExperienceItem extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

export default ExperienceItem;
