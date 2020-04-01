import {Page} from '../../../../Page';
import template from './index.pug';
import './style.sass';
import withLocalStore from '../localStore';
class PreviewInfo extends Page {
  /**
   * @return{string}
   */
  render() {
    return template({
      info: this.props.getStore().preview,
    });
  }
}

PreviewInfo = withLocalStore(PreviewInfo);
export {
  PreviewInfo,
};
