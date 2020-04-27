import {Page} from '../../../../Page';
import template from './index.pug';

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
