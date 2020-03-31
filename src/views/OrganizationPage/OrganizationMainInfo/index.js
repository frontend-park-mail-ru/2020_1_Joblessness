import {Page} from '../../../Page';
import './style.sass';
import template from './index.pug';
import {withChainedPages} from '../../../ulils';
import {RootPath, SubRoutes} from './subRoutes';

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

OrganizationMainInfoPage = withChainedPages(OrganizationMainInfoPage,
  SubRoutes, null, RootPath);
export {
  OrganizationMainInfoPage,
};
