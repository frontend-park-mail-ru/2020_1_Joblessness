import {Page} from '../../../../Page';
import './style.sass';
import template from './index.pug';

class Item extends Page {
  render() {
    return template({
      info: this.props.getStore().conditions.raw
          .filter((r) => r.id === this.props.info.id)[0],
    });
  }
}

export {
  Item,
};
