import {Page} from '../../../Page';
import template from './index.pug';
import './style.sass';

class ContainerPage extends Page {
  render() {
    return template(this.props);
  }
}

export {
  ContainerPage,
};
