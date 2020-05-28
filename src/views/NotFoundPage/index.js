import {Page} from '../../Page.js';
import template from './index.pug'
import './style.sass'
/**
 * 404 page
 */
const randomMessage = [
  'Миллионы людей не находят то, что ищут. Вы в их числе',
  'Не повезло с поиском работы - повезет в любви',
  'Не ошибается тот, кто ничего не делает',
  'Поздравляем! Вы нашли тупик.',
  'Продам гараж',
  'Если три раза хлопнуть в ладоши, то произойдет три хлопка',
  `Шел undefined через null, видит [object Object] в реке NaN сунул "Cannot read property 'name' of undefined" в реку руку ` + '${animal.name} за руку void цап'
];
class NotFoundPage extends Page {
  #lastPage
  /**
   * @return {string} - page to render
   */
  constructor(props) {
    super(props);
    this.#lastPage = Math.floor(Math.random() * randomMessage.length);
  }
  render() {
    return template({
      messages : randomMessage,
      messageId: this.#lastPage
    });
  }
  componentDidMount() {
    super.componentDidMount();
    this.#lastPage = Math.floor(Math.random() * randomMessage.length);
  }
}

export {
  NotFoundPage,
};
