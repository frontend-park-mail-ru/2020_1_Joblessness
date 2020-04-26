import {Page} from '../../../Page';
import template from './index.pug';
import withLocalStore from '../localStore';
import './style.sass';
import {withChainedPages} from '../../../ulils';
import {SubRoutes} from './SubRoutes';
class SummariesPage extends Page {
  render() {
    return template(this.props);
  }
}

SummariesPage = withLocalStore(SummariesPage, {
  updateSummaries: (a, b,c) => {
    console.log(a,b,c)
  }
});

SummariesPage = withChainedPages(SummariesPage, SubRoutes, null, '');
export {
  SummariesPage,
};
