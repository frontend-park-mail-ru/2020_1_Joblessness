import template from './index.pug';
import './style.sass';
import {Page} from '../../../../Page';
import {uuid} from '../../../../ulils';
import {playMountAnimation} from '../../../OrganizationPage/OrganizationVacancies/addAnimations';

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
      selectId: this.#selectId,
    });
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
    }
  }
}
export {
  SummaryPreview,
};
