import {uuid} from './ulils';
import {isDomElement, isBody, isString, hasId} from './ulils/validators';

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
    props = {};
    componentDidMount = null;
    componentWillMount = null;

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
                        isDomElement(container) ? container: null;
      if (!selector || !dom) {
        throw new Error(`
            Expected id or DOM element with id or body as container. 
            Received ${container}`,
        );
      }

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

    /**
     * check if component is hidden
     * @return {boolean}
     */
    isHidden() {
      return this.dom.hidden || getComputedStyle(this.dom).display === 'none';
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
        this.#container.dom.appendChild(this.dom);
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
      const toShow = this.render();

      if (toShow) {
        this.dom.innerHTML = toShow;
      } else {
        console.error(`
              Render function must return string.
              Setting innerHTML is not supported anymore!`);
      }
      this.dom.hidden = false;
      this.dom.style.display = '';
      this.dom.innerHTML = toShow;
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


      this.componentWillMount && this.componentWillMount();
      this.showPage();
      this.componentDidMount && this.componentDidMount();
    }
}
