import './style.sass';
import {Page} from '../../../Page';
import template from './index.pug';
import {uuid, withChainedPages, withForm} from '../../../ulils';
import {AtEditRoute} from './atEdit/AtEditRoute';
import {StartEditRoute} from './startEdit/StartEditRoute';

/**
 * Add experience subpage
 */
class AddEducationPage extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

AddEducationPage = withChainedPages(AddEducationPage, [
    StartEditRoute,
    AtEditRoute,
  ],
  null,
  '/summaries/create/',
);
export {
  AddEducationPage,
};
