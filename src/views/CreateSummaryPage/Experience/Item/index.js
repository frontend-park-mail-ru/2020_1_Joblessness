import {Page} from '../../../../Page';
import './style.sass';
import template from './index.pug';

class Item extends Page {
  render() {
    console.log(this.props)
    return template({
      ...this.props,
      info: this.props.getStore().experience.raw.filter((r) => r.id === this.props.info.id)[0],
    });
  }
}

export {
  Item,
};
