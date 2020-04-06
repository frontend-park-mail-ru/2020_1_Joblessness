import {Page} from '../../../Page';
import './style.sass';
import template from './index.pug';
import withLocalStore from '../localStore';

class Display extends Page {
  componentWillUpdate() {
    super.componentWillUpdate();
    this.props.needUpdate = true;
  }

  render() {
    return template({
      ...this.props,
      items: this.props.getStore().responses,
    });
  }
}

Display = withLocalStore(Display);
export {
  Display,
};
