import {Page} from '../../../../Page';
import template from './index.pug';

class Preview extends Page {
  /**
   * @return{string}
   */
  render() {
    return template({
      info: this.props.getStore().conditions.preview,
    });
  }
}

export {
  Preview,
};
