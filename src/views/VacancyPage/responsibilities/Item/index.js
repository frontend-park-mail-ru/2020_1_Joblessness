import {Page} from '../../../../Page';
import template from './index.pug';

class Item extends Page {
  render() {
    return template({
      info: this.props.getStore().responsibilities.raw.filter((r) => r.id === this.props.info.id)[0],
    });
  }
}

export {
  Item,
};
