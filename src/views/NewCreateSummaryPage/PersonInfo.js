import {Page} from '../../Page';
import template from './pug/personInfo.pug';

class PersonInfo extends Page {
  render() {
    return template(this.props);
  }
}


export {
  PersonInfo,
};
