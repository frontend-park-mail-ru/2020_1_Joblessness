import template from './index.pug';
import './style.sass';
import {Page} from '../../../../Page';

/**
 * Single experience item (subpage for showExperience)
 */
class EducationItem extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
  componentDidMount() {
    super.componentDidMount?.();
    if(!this._wasMounted) {
      const e = document.querySelector(this.container).parentNode;
      e.classList.add('placing');
      setTimeout(
        () => e.classList.remove('placing'), 500
      );
      e.classList.add('removing');
      setTimeout(
        () => e.classList.remove('removing'), 1
      );
      this._wasMounted = true
    }
  }
}

export default EducationItem;
