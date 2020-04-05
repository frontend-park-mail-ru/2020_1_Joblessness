import './style.sass';
import './auth-elements.sass';
import {Page} from '../../../Page';
import template from './pug/index5.pug';

/**
 * Prompt subpage
 */
class FifthStep extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}
export {FifthStep};
