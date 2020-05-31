import {Page} from '../../../../Page';
import template from './index.pug';
import {isCreationPage} from '../../Education/routes';

class Preview extends Page {
  /**
   * @return{string}
   */
  render() {
    return template({
      isCreation: isCreationPage(),
      info: this.props.getStore().experience.preview,
    });
  }
}

export {
  Preview,
};
