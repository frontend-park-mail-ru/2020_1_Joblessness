import './show-experience.sass'
import {Page} from '../../Page';
import template from './pug/showExperience.pug'

class ShowExperiencePage extends Page {
  render() {
    return template(this.props)
  }
}

export {
  ShowExperiencePage
}