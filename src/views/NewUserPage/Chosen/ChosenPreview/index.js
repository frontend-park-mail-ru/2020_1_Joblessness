import template from './index.pug';
import './style.sass';
import {Page} from '../../../../Page';
import {requestManager, uuid} from '../../../../ulils';
import {playMountAnimation} from '../../../OrganizationPage/OrganizationVacancies/addAnimations';

/**
 *
 */
class ChosenPreview extends Page {
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
    const parent = document.querySelector(this.container);
    if (!this._wasMount) {
      this._wasMount = true;
      playMountAnimation(parent);
    }
  }
}
export {
  ChosenPreview,
};
