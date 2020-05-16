import {Page} from '../../../../Page';
import template from './index.pug';

class AddItem extends Page {
  render() {
    return template(this.props);
  }
}

export {
  AddItem,
};
