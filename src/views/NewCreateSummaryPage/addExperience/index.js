import './style.sass';
import {Page} from '../../../Page';
import template from './index.pug';
import {uuid, withChainedPages, withForm} from '../../../ulils';
import {AtEditRoute} from './atEdit/AtEditRoute';
import {StartEditRoute} from './startEdit/StartEditRoute';

/**
 * Add experience subpage
 */
class AddExperiencePage extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

AddExperiencePage = withChainedPages(AddExperiencePage, [
    StartEditRoute,
    AtEditRoute,
  ],
  null,
  '/summaries/create/',
);
export {
  AddExperiencePage,
};
