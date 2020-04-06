import {Page} from '../../../Page';
import './style.sass';
import template from './index.pug';
import {withChainedPages} from '../../../ulils';
import ROUTES from './summaries/routes';
import LoadManagerRoutes from './summaries/loadManager';

class ResponsePage extends Page {
  render() {
    return template(this.props);
  }
}

ResponsePage = withChainedPages(ResponsePage, [...ROUTES, ...LoadManagerRoutes], null, '');
export {
  ResponsePage,
};
