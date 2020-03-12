import './style.sass'
import {Page} from '../../../Page';
import template from './index.pug';

class PersonInfo extends Page {
  render() {
    return template(this.props);
  }
}


export {
  PersonInfo,
};
