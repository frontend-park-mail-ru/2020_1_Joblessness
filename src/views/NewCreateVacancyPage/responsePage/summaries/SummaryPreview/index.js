import {Page} from '../../../../../Page';
import template from './index.pug';
import './style.sass';
import {addHideAnimation, playMountAnimation} from '../addAnimations';
import {requestManager, uuid} from '../../../../../ulils';
import {getVacId} from '../../../getVacId';
import {Navigator} from '../../../../../Navigator';

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
    console.log(this.props);
    return template({
      ...this.props,
      selectId: this.#selectId,
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
    requestManager
        .trySendSummary(getVacId(), page.props.summary.id)
        .then(async (r) => {
          alert('резюме успешно отправлено');
          Navigator.showPage(`/vacancies/${getVacId()}`);
        }).catch((r) => {
          alert('Не удалось оставить отклик');
          Navigator.showPage(`/vacancies/${getVacId()}`);
        });
  });
};
export {
  SummaryPreview,
};
