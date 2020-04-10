import {Page} from '../../../../Page';
import template from './index.pug';
import withLocalStore from '../../localStore';

/**
 */
class SummariesListPage extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

SummariesListPage = withLocalStore(SummariesListPage);

export {
  SummariesListPage,
};
