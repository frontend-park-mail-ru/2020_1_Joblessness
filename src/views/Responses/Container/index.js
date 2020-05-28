import {Page} from '../../../Page';
import template from './index.pug'

class Container extends Page {
  render() {
    return template(this.props)
  }
}

const ROOT_ELEMENT = new Container('#root');
const Routes = [
  {
    path: 'responses',
    element : new Container('#root')
  }
];

export const constructRoutes = (childRoutes = []) => [
  {
    path: 'responses',
    element : new Container('#root'),
    childRoutes,
  }
];

export default Routes;