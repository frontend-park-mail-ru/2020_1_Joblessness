import {Page} from '../../../../../Page';
import template from './index.pug';
import './style.sass';
import {addHideAnimation, playMountAnimation} from '../addAnimations';
import {requestManager, uuid} from '../../../../../ulils';

/**
 *
 */
class SummaryPreview extends Page {
  /**
   *
   * @return {string}
   */
  #selectId;

  constructor(props) {
    super(props);
    this.#selectId = uuid();
  }
  render() {
    return template({
      ...this.props,
      selectId: this.#selectId
    });
  }

  /**
   * animation on mount
   */
  componentDidMount() {
    super.componentDidMount();
    initResponseEvent(this, this.#selectId);
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

const initResponseEvent = (page, id) => {
  const button = document.getElementById(id);

  button?.addEventListener('click', () => {
    //@TODO создать отклик
  })
};
export {
  SummaryPreview,
};
