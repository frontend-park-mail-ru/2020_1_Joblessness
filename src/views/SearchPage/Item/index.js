import {Page} from '../../../Page';
import template from './index.pug';
import './style.sass';

class Item extends Page {
  render() {
    return template(this.props);
  }

  componentDidMount() {
    super.componentDidMount();
    const parent = document.querySelector(this.container);
    if (!this._wasMount) {
      this._wasMount = true;
      parent.classList.add('placing');
      setTimeout(() => parent.classList.remove('start'), 100);
    } else {
      parent.classList.remove('start')
      if (parent) {
        parent.style.transitionDuration = '0';
      }
    }
  }
}

export default Item;
