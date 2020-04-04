import {Page} from '../../../Page';
import template from './index.pug'
import './style.sass'
import {withLocalStore} from '../withLocalStore';
class Display extends Page {
  render() {
    return template(this.props.getStore().search)
  }
}

Display = withLocalStore(Display)
export {
  Display
}