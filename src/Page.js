"use strict";

/**
 * Page - класс от которого наследуются страницы
 * описывает общие методы и реализует метод создания в DOM бокса под страницу
 * наверное можно заменить на миксин createDomBox
 */
export class Page {
    constructor() {
        this.render();
    }

    name() {
    }

    domName() {
        console.log(`${this.name()}-page`);
        return `${this.name()}-page`;
    }

    createDomBox(domName) {
        let domBox = document.createElement("div");
        domBox.className = `page ${domName}`;
        // все страницы по умолчанию скрыты
        domBox.hidden = true;
        document.querySelector('#root').appendChild(domBox);
        return domBox;
    }

    template() {
    }

    render() {
    }
}
