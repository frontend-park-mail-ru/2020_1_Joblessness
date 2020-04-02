import {Page} from '../../../../Page';
import './style.sass';
import template from './index.pug';

/**
 * Info subpage
 */
class OrganizationMainInfoPage extends Page {

  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

export {
  OrganizationMainInfoPage,
};
