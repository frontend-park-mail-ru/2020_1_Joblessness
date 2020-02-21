"use strict";

/**
 * Page - класс от которого наследуются страницы
 * описывает общие методы и реализует метод создания в DOM бокса под страницу
 * наверное можно заменить на миксин createDomBox
 */
export class Page {

    /**
     * Конструктор рендерит страницу
     * @param container - контейнер, в который будет помещена страница
     */
    constructor(container) {
        if (container) {
            this.container = document.querySelector(container);
        }
        this.render();
    }

    /**
     * Абстрактный метод, возвращает имя страницы
     */
    name() {
    }

    /**
     * Имя dom-элемента страницы
     * @returns {string}
     */
    domName() {
        return `${this.name()}-page`;
    }

    /**
     * Геттер dom-элемента старицы
     * @returns {Element}
     */
    getDomElem() {
        return document.querySelector(`.${this.domName()}`);
    }

    /**
     * Создать блок страницы и поместить его в контейнер
     * @param domName - имя создаваемого блока
     * @returns {HTMLDivElement}
     */
    createDomBox(domName) {
        let domBox = document.createElement("div");
        domBox.className = `page ${domName}`;
        // все страницы по умолчанию скрыты
        domBox.hidden = true;
        this.container.appendChild(domBox);
        return domBox;
    }

    /**
     * Очистить страницу к начальному состоянию
     */
    clearPage() {
        document.querySelectorAll(`.${this.domName()} .input`).forEach( element => {
            if (element.type === 'text') {
                element.value = '';
            } else {
                element.checked = false;
            }
        });

        document.querySelectorAll(`.${this.domName()} .output`).forEach( element => {
            element.innerHTML = '';
        });
    }

    /**
     * Спрятать страницу
     */
    hidePage() {
        this.clearPage();
        this.getDomElem().hidden = true;
    }

    /**
     * Показать страницу
     */
    showPage() {
        this.getDomElem().hidden = false;
    }

    render() {}
}
