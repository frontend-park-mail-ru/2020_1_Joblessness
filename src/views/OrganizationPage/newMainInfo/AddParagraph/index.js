import {Page} from '../../../../Page';
import template from './index.pug';

class AddParagraph extends Page {
  render() {
    return template(this.props);
  }
}

export {
  AddParagraph,
};
