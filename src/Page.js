import {uuid} from './ulils';
import {isDomElement, isBody, isString, hasId} from './ulils/validators';

const isEqual = (o1, o2) => {
  if (typeof o1 === 'string' || typeof o1 === 'function' || typeof o1 === 'number' || o1 === null) {
    return o1 === o2
  }
  if (o1 instanceof Array) {
    return o1.toString() === o2.toString()
  }
  if (!isEqual(Object.keys(o1), Object.keys(o2)))
    return false;
  for (let o of Object.keys(o1)) {
    if (!isEqual(o1[o], o2[o]))
      return false;
  }
  return true;
};

/**
 * Page - класс от которого наследуются страницы
 * описывает общие методы и реализует метод создания в DOM бокса под страницу
 * наверное можно заменить на миксин createDomBox
 */
export class Page {
  static isPageComponent = true;
  // #dom;
  #pageId;
  #container;
  #prevRender;
  #prevProps;
  #prevContainerDom;
  props = {};
  componentDidMount = null;
  componentWillMount = null;
  componentWillUpdate = null;
  /**
   * Конструктор рендерит страницу
   * @param {HTMLAnchorElement|string} container - контейнер,
   * в который будет помещена страница
   */
  constructor(container) {
    // selector is id or 'body'
    const selector = isString(container) ? container :
      isDomElement(container) ?
        hasId(container) ? container.id :
          isBody(container) ? 'body' : null : null;
    // get dom or use provided one
    const dom = isString(container) ? document.querySelector(container) :
      isDomElement(container) ? container : null;
    if (!selector) {
      throw new Error(`
            Expected id or DOM element with id or body as container. 
            Received ${container}`,
      );
    }
    this.#prevContainerDom = null;
    this.#prevProps = null;
    this.#container = {selector, dom};
    this.#pageId = uuid(); // to identify page
    this.dom = this._createDomBox(this.#pageId); // to store children
    this.dom.id = this.#pageId;
  }

  /**
   * returns container selector
   * @return {string}
   */
  get container() {
    return this.#container.selector;
  }

  requestUpdate() {
    if (isEqual(this.#prevProps, this.props)) {
      //do nothing
    } else {
      this.showPage()
    }
  }

  /**
   * check if component is hidden
   * @return {boolean}
   */
  isHidden() {
    return this.#container?.dom?.hidden || !this.#container?.dom?.innerHTML
  }

  /**
   * Спрятать страницу
   */
  hidePage() {
    this.dom.style.display = 'none';
    this.dom.innerHTML = '';
    this.dom.hidden = true;
  }

  /**
   * Создать блок страницы и поместить его в контейнер
   * @param {string} domName - имя-класс создаваемого блока
   * @return {HTMLDivElement}
   */
  _createDomBox(domName) {
    if (!this.dom) {
      this.dom = document.createElement('div');
      this.dom.id = domName; // @TODO should replace with id?
      // все страницы по умолчанию скрыты
      this.dom.hidden = true;
      // this.#container.dom.appendChild(this.dom);
    }
    return this.dom;
  }

  /**
   * Возвращает строку с содержимым страницы.
   * @WARNING не использовать напрямую. Использовать requestRender
   */
  render() {
    throw new Error(`
        Method render must be overwritten!
        `);
  };

  /**
   * Показать страницу
   */
  showPage() {

    this.#container.dom = document.querySelector(this.#container.selector);
    if (!this.#container.dom) {
      throw new Error(`
          Unable to find dom with selector ${this.#container.selector}
          `)
    }
    this.componentWillUpdate && this.componentWillUpdate();
    const toShow = this.render();

    if (!toShow) {
      console.error(`
              Render function must return string.
              Setting innerHTML is not supported anymore!`);
    }
    if (this.#prevRender !== toShow ||
      this.#prevContainerDom !== this.#container.dom ||
      !isEqual(this.#prevProps, this.props)
      ||this.#container.dom.currentChild !== this) {
      this.#container.dom.currentChild = this
      this.componentWillMount && this.componentWillMount();

      this.#container.dom.hidden = false;
      this.#container.dom.style.display = '';
      this.#container.dom.innerHTML = toShow;

      this.#prevRender = toShow;
      this.#prevContainerDom = this.#container.dom;
      this.#prevProps = {...this.props};

      this.componentDidMount && this.componentDidMount();
    }
  }

  /**
   * Отрисовывает страницу, вызывает события (если имеются)
   * componentWillMount и componentDidMount
   */
  requestRender() {
    if (typeof this.render !== 'function') {
      throw new Error(`
            Method render is reserved by Page Component and
            must be overwritten by function with return
            value of type string!`);
    }

    this.showPage();
  }
}
