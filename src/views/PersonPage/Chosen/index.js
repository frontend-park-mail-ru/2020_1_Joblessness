import {Page} from '../../../Page';
import template from './index.pug';
import withLocalStore from '../localStore';
import './style.sass';
import {withChainedPages} from '../../../ulils';
import {SubRoutes} from './SubRoutes';
class ChosenPage extends Page {
  render() {
    return template(this.props);
  }
}

ChosenPage = withLocalStore(ChosenPage);

ChosenPage = withChainedPages(ChosenPage, SubRoutes, null, '');
export {
  ChosenPage,
};
