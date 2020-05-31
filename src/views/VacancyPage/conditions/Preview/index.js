import {Page} from '../../../../Page';
import template from './index.pug';
import {isCreationPage} from '../../isCreationPage';

class Preview extends Page {
  /**
   * @return{string}
   */
  render() {
    return template({
      isCreation: isCreationPage(),
      info: this.props.getStore().conditions.preview,
    });
  }
}

export {
  Preview,
};
