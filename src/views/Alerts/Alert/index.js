import {Page} from '../../../Page';
import template from './index.pug';
class Alert extends Page {
  #timerId
  render() {
    return template(this.props)
  }
  componentDidMount() {
    super.componentDidMount();
    this.getContainer()?.addEventListener('click', () => {
      clearTimeout(this.#timerId);
      this.getContainer()?.classList.remove('mounting');
      this.props.hide();
    })
    if(!this._wasMount) {
      this._wasMount = true;
      this.getContainer().classList.add('mounting');
      this.#timerId = setTimeout(() => {
        this.props.hide();
      },  1000)
    }
  }
}

export default Alert