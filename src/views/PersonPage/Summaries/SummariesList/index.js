import {Page} from '../../../../Page';
import template from './index.pug';


class Summaries extends Page {
  render() {
    return template(this.props)
  }
}

export {
  Summaries
}