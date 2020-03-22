import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {uuid, withChainedPages, withForm} from '../../ulils';

import withLocalStore from './localStore';
import CreateSummaryRoutes from './CreateSummaryRoutes';
/**
 * summary creation forms
 */
class CreateSummaryPage extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return template(this.props);
  }
}

CreateSummaryPage = withLocalStore(CreateSummaryPage);

CreateSummaryPage = withForm(CreateSummaryPage, {}, {
  id: uuid(),
},
(e, page) => {
  console.log(page.props.getStore());
},
);

CreateSummaryPage = withChainedPages(CreateSummaryPage,
    CreateSummaryRoutes, null, '/summaries/create/');

export {
  CreateSummaryPage,
  CreateSummaryRoutes,
};
