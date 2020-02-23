"use strict";
import {uuid} from './ulils'

/**
 * @class
 * Page - класс от которого наследуются страницы
 * описывает общие методы и реализует метод создания в DOM бокса под страницу
 * наверное можно заменить на миксин createDomBox
 */
export class Page {

    props = {};
    componentDidMount = null;
    componentWillMount = null;
    static isPageComponent = true;

    /**
     * Геттер dom-элемента старицы
     * @returns {Element}
     */
    getDomElem() {
        return document.querySelector(`.${this.domName()}`);
    }

    /**
     * Конструктор рендерит страницу
     * @param container - контейнер, в который будет помещена страница
     */
    constructor(container) {
        if (container) {
            this.container = document.querySelector(container);
        } else {
            throw new Error(
                `Expected string as container. Received ${container}`
            )
        }
        this.__name = uuid();
        this.domBox = this.createDomBox(this.domName());
    }

    /**
     * Имя dom-элемента страницы
     * @returns {string}
     */
    domName() {
        if (typeof this.name === "function") {
            return `${this.name()}`;
        }
        return this.__name;
    }

    /**
     * Спрятать страницу
     */
    hidePage() {
        this.getDomElem().style.display = "none";
        this.getDomElem().hidden = true;
    }

    /**
     * Создать блок страницы и поместить его в контейнер
     * @param domName - имя-класс создаваемого блока
     * @returns {HTMLDivElement}
     */
    createDomBox(domName) {
        if (!this.domBox) {
            this.domBox = document.createElement("div");
            this.domBox.className = domName; //@TODO should replace with id?
            // все страницы по умолчанию скрыты
            this.domBox.hidden = true;
            this.container.appendChild(this.domBox);
        }
        return this.domBox

    }

    /**
     * Возвращает строку с содержимым страницы.
     * @WARNING не использовать напрямую
     */
    render() {
        throw new Error(`
        Method render must be overwritten!
        `)
    };

    /**
     * Очистить страницу к начальному состоянию.
     * @deprecated
     * Более не нужен, так как это выполняется при перерисовке страницы через requestRender()
     */
    clearPage() {
        console.error(`
        Method clearPage is not supported anymore!
        Page automatically clears on reload`)
    }

    /**
     * Показать страницу
     */
    showPage() {
        const dom = this.getDomElem();

        if (!dom) {
            throw new Error(`
            Render function must return string!`
            )
        }
        dom.hidden = false;
        dom.style.display = ""
    }

    requestRender() {
        if (typeof this.render !== "function") {
            throw new Error(`
            Method render is reserved by Page Component and
            must be overwritten by function with return
            value of type string!`);
        }

        this.componentWillMount && this.componentWillMount();
        const toShow = this.render();

        if (toShow) {
            this.domBox.innerHTML = toShow;
        } else {
            console.error(`
            Render function must return string.
            Setting innerHTML is not supported anymore!`)
        }

        this.showPage();
        this.componentDidMount && this.componentDidMount();
    }
}
