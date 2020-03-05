import {Page} from '../../Page';
import template from './pug/showEducation.pug'

class ShowEducationPage extends Page {
  render() {
    return template(this.props)
  }
}

export {
  ShowEducationPage
}