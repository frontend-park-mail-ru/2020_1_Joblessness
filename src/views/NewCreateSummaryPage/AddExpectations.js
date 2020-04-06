import {Page} from '../../Page';
import template from './pug/expectations.pug'
class ExpectationsPage extends Page {

  render() {
    return template(this.props)
  }
}

