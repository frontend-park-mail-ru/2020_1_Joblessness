import './style.sass';
import {Page} from '../../../Page';
import template from './index.pug';

/**
 * user info subPage
 */
class PersonInfo extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}


export {
  PersonInfo,
};
