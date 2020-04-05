import {Page} from '../../../../Page';
import template from './index.pug';

class AboutPage extends Page {
  render() {
    return template(this.props);
  }
}

export {
  AboutPage
}