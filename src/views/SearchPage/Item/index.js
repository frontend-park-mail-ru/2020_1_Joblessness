import {Page} from '../../../Page';
import template from './index.pug';
import './style.sass';
import {
  playMountAnimation,
} from '../../OrganizationPage/OrganizationVacancies/addAnimations';

class Item extends Page {
  render() {
    return template(this.props);
  }

  componentDidMount() {
    super.componentDidMount();
    const parent = document.querySelector(this.container);
    if (!this._wasMount) {
      this._wasMount = true;
      playMountAnimation(parent);
    } else {
      if (parent) {
        parent.style.transitionDuration = '0';
        // parent.firstChild.style.transform = this._rot;
        // parent.firstChild.style.opacity = this._val;
        // parent.firstChild.style.transformOrigin = this._trans ?? 'left center';
      }
    }
  }
}

export default Item;
