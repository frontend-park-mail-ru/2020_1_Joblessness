import {Page} from '../../../Page';
import './style.sass';
import template from './index.pug';
import withLocalStore from '../localStore';
import {equals, uuid} from '../../../ulils';
import {Navigator} from '../../../Navigator';

class Display extends Page {
  componentWillUpdate() {
    super.componentWillUpdate();
  }

  render() {
    return template(this.props);
  }
}

export {
  Display,
};
