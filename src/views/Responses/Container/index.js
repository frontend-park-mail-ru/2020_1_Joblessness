import {Page} from '../../../Page';
import template from './index.pug'
import {ORGANIZATION} from '../../../CONSTANTS';
import {Navigator} from '../../../Navigator';

class Container extends Page {
  render() {
    return template(this.props)
  }
  componentDidMount() {
    super.componentDidMount();
    if(currentSession.user.role !== ORGANIZATION) {
      Navigator.showPage('404');
      return;
    }
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