import {Page} from '../../../../Page';
import template from './index.pug';
import './style.sass';

class Edit extends Page {
  render() {
    return template({editorProps: this.props.editorProps, info: this.props.getStore().education.raw});
  }
}

export {
  Edit,
};
