import {Page} from '../../Page';
import './style.sass';
import template from './pug/index.pug';
import '../sharableStyle.sass';
import {withChainedPages} from '../../ulils';
import {SubRoutes, RootPath} from './routes';
import {appendWithNetwork} from './appendWithNetwork';
/**
 *
 */
class OrganizationPage extends Page {
  /**
   * @return {string}
   */
  render() {
    return template(this.props);
  }
}
// OrganizationPage = appendWithNetwork(OrganizationPage);
OrganizationPage = withChainedPages(OrganizationPage, SubRoutes,
    null, RootPath);
export {
  OrganizationPage,
};
