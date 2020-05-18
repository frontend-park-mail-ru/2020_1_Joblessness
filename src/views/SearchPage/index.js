import {Page} from '../../Page';
import template from './index.pug';
import {withChainedPages} from '../../ulils';
import SubRoutes from './subRoutes';

class SearchPage extends Page {

  render() {
    return template(this.props);
  }
}

SearchPage = withChainedPages(SearchPage, SubRoutes, null, '');
export {
  SearchPage,
};
