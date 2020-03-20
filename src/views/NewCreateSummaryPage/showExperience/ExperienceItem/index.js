import template from './index.pug'
import './style.sass'
import {Page} from '../../../../Page';

class ExperienceItem extends Page {
  render() {
    return template(this.props)
  }
}

export default ExperienceItem