import {render} from './Render'
import {createElement} from './CreateElement'
import {useState} from './Hooks'
import {Component} from './Component'
import {workLoop} from './worker'
import './vars'
/* exported JssssKit */
/*global JssssKit*/
class JssssKit {
    render = render;
    createElement = createElement;
    useState = useState;
    Component = Component;

    constructor() {
        globalThis.requestIdleCallback(workLoop);
    }
}
const instance = new JssssKit();
export default instance;

export {
    useState,
    render,
    createElement,
    Component
}