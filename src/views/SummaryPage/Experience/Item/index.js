import {Page} from '../../../../Page';
import template from './index.pug';

class Item extends Page {
  render() {
    return template({
      ...this.props,
      info: this.props.getStore().experience.raw.filter((r) => r.id === this.props.info.id)[0],
    });
  }
}

export {
  Item,
};
