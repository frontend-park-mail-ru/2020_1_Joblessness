import './style.sass';
import {Page} from '../../Page';
import template from './pug/sub/favourite.pug';

/**
 * User favorites subpage
 */
class FavouriteSubPage extends Page {
  /**
   * favourite subpage
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

export {FavouriteSubPage};
