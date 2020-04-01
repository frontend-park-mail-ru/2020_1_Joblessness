import {Page} from '../../../Page';
import template from './index.pug';
import './style.sass';
import {uuid} from '../../../ulils';
class ChosenButton extends Page {
  #elemId;
  #prevElem;
  constructor(props) {
    super(props);
    this.#elemId = uuid();
  }
  render() {
    return template({
      ...this.props,
      elemId: this.#elemId,
    });
  }
  componentDidMount() {
    super.componentDidMount();
    if (this.#prevElem) {
      this.#prevElem.removeEventListener('click', toggleEvent);
    }
    this.#prevElem = document.getElementById(this.#elemId);
    this.#prevElem.addEventListener('click', toggleEvent);
  }
}

const toggleEvent = (e) => {
  e.target.classList.toggle('not-chosen');
};

export {
  ChosenButton,
};
