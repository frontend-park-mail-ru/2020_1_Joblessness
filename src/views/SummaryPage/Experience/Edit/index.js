import {Page} from '../../../../Page';
import template from './index.pug';

class Edit extends Page {
  render() {
    return template({editorProps: this.props.editorProps, info: this.props.getStore().experience.raw});
  }
}

export {
  Edit,
};
