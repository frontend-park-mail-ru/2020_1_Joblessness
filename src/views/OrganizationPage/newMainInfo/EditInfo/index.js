import {Page} from '../../../../Page';
import template from './index.pug';
import './style.sass';

class EditInfo extends Page {
  render() {
    return template({editorProps: this.props.editorProps,
      info: this.props.getStore().mainInfo.raw});
  }
}

export {
  EditInfo,
};
