import {Page} from '../../Page';
import template from './index.pug'
/**
 * To append Header as subpage
 */
class RootElement extends Page {
  /**
   * @return {string}
   */
  render() {
    return template(this.props)
  }
}

export {
  RootElement,
};

export const CONTAINER = '#holder';
export const ROOT_ELEMENT = new RootElement(CONTAINER);

const Routes = [
  {
    path: 'root',
    alwaysOn: true,
    element: ROOT_ELEMENT,
  },
];

export default Routes;