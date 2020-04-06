import './style.sass';
import './auth-elements.sass';
import {Page} from '../../../Page';
import template from './pug/index1.pug';

/**
 * Fancy page
 */
class FirstStep extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

export {FirstStep};
