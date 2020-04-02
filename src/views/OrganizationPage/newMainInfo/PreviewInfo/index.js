import {Page} from '../../../../Page';
import template from './index.pug'
import './style.sass'

class PreviewInfo extends Page {
  /**
   * @return{string}
   */
  render() {
    return template({
      info: this.props.getStore().mainInfo.preview
    })
  }
}

export {
  PreviewInfo
}