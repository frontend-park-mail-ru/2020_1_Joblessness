"use strict";

/**
 * Page - класс от которого наследуются страницы
 * описывает общие методы и реализует метод создания в DOM бокса под страницу
 * наверное можно заменить на миксин createDomBox
 */
export class Page {
    constructor(container) {
        this.container = container
    }

    name() {
    }

    domName() {
        return `${this.name()}-page`;
    }

    getDomElem() {
        return document.querySelector(`.${this.domName()}`);
    }

    createDomBox(domName) {
        let domBox = document.createElement("div");
        domBox.className = `page ${domName}`;
        // все страницы по умолчанию скрыты
        domBox.hidden = true;
        document.querySelector('#root').appendChild(domBox);
        return domBox;
    }

    render() {}
}
