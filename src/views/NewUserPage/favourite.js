import './style.sass'
import {Page} from '../../Page';
import template from './pug/sub/favourite.pug'

class FavouriteSubPage extends Page {

  render() {
    return template(this.props);
  }
}

export {FavouriteSubPage};
