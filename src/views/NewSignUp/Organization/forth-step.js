import './style.sass';
import './auth-elements.sass';
import {Page} from '../../../Page';
import template from './pug/index4.pug';
/**
 * Prompt subpage
 */
class ForthStep extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

export {ForthStep};
