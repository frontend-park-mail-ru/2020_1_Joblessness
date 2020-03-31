import {Page} from '../../../../Page';
import template from './index.pug'
import './style.sass'
import {addHideAnimation} from '../addAnimations';

/**
 *
 */
class CreateVacancyButton extends Page {
  /**
   *
   * @returns {string}
   */
  render() {
    return template(this.props)
  }
  /**
   *
   */
  componentDidMount() {
    super.componentDidMount();
    const parent = document.querySelector(this.container);
    if (!this._wasMount) {
      this._wasMount = true;
      setTimeout(() => addHideAnimation(this), 1);
    } else {
      parent.firstChild.style.transitionDuration = '0';
      parent.firstChild.style.transform = this._rot;
      parent.firstChild.style.opacity = this._val;
      parent.firstChild.style.transformOrigin = this._trans ?? 'left center';
      setTimeout(() => addHideAnimation(this, true), 1);
    }
  }
}

export {
  CreateVacancyButton
}