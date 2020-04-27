import {Page} from '../../Page';
import template from './index.pug'
import {Header} from '../Header';
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
    childRoutes: [
      {
        path: 'header',
        alwaysOn: true,
        element: new Header('#nav-elements'),
      },
    ],
  },
];

export default Routes;