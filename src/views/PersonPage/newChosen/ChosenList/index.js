import {Page} from '../../../../Page';
import template from './index.pug';


class ChosenList extends Page {
  render() {
    return template(this.props)
  }
}

export {
  ChosenList
}