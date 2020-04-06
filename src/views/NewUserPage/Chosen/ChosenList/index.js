import {Page} from '../../../../Page';
import template from './index.pug'
import withLocalStore from '../../localStore';

/**
 */
class ChosenListPage extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

ChosenListPage = withLocalStore(ChosenListPage);

export {
  ChosenListPage
}
