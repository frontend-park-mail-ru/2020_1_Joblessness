import {Page} from '../../../../Page';
import template from './index.pug';
import './style.sass';

class Preview extends Page {
  /**
   * @return{string}
   */
  render() {
    return template({
      info: this.props.getStore().responsibilities.preview,
    });
  }
}

export {
  Preview,
};
