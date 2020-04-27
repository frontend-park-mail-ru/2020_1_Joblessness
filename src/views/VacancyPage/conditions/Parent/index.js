import {Page} from '../../../../Page';
import template from './index.pug';

/**
 * Info subpage
 */
class Parent extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

export {
  Parent,
};
