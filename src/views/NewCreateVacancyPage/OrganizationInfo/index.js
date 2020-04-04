import {Page} from '../../../Page';
import template from './index.pug';

/**
 * Organization info subpage
 */
class OrganizationInfo extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

export {
  OrganizationInfo,
};
