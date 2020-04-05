import {Page} from '../../../../Page';
import template from './index.pug';
import './style.sass';
import {addHideAnimation, playMountAnimation} from '../addAnimations';

/**
 *
 */
class VacancyPreview extends Page {
  /**
   *
   * @return {string}
   */
  render() {
    console.log(this.props)
    return template(this.props);
  }

  /**
   * animation on mount
   */
  componentDidMount() {
    super.componentDidMount();
    const parent = document.querySelector(this.container);
    if (!this._wasMount) {
      this._wasMount = true;
      playMountAnimation(parent);
      setTimeout(() => addHideAnimation(this), 1);
    } else {
      parent.style.transitionDuration = '0';
      parent.firstChild.style.transform = this._rot;
      parent.firstChild.style.opacity = this._val;
      parent.firstChild.style.transformOrigin = this._trans ?? 'left center';
      setTimeout(() => addHideAnimation(this, true), 1);
    }
  }
}

export {
  VacancyPreview,
};
