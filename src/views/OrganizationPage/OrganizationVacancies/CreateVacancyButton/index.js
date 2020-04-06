import {Page} from '../../../../Page';
import template from './index.pug';
import './style.sass';
import {addHideAnimation} from '../addAnimations';
import withLocalStore from '../../localStore';
import {getOrgId} from '../../getOrgInfo';
import {ORGANIZATION} from '../../../../CONSTANTS';

/**
 *
 */
class CreateVacancyButton extends Page {
  /**
   *
   * @return {string}
   */
  render() {
    return template(this.props);
  }
  /**
   *
   */
  componentDidMount() {
    super.componentDidMount();
    if ( currentSession.user.role !== ORGANIZATION || currentSession.user.id !== this.props.getStore().organization.id) {
      document.querySelector(this.container).style.display = 'none';
      return;
    }
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

CreateVacancyButton = withLocalStore(CreateVacancyButton);

export {
  CreateVacancyButton,
};
