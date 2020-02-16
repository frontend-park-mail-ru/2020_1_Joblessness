import {createDom} from '../CreateDom'
import {reconcileChildren} from '../ReconcileChildren'

/**
 * Updates Class Component
 * @param {Object} fiber - JssssKit Element
 */
//@TODO setstate works wrong
function updateClassComponent(fiber) {
    if (!fiber.instance) {
        fiber.instance = new fiber.type(fiber.props)
        // fiber.type = new fiber.type(fiber.props)
    }
    globalThis.JssssKit.wipFiber = fiber;
    // globalThis.JssssKit.wipFiber.state = fiber.type.state;
    fiber.instance.props = fiber.props;
    const children = [fiber.instance.requestRender.apply(fiber.instance)];
    reconcileChildren(fiber, children);
}

/**
 * Updates functional component
 * @param {Object} fiber - JssssKit Element
 */
function updateFunctionComponent(fiber) {
    globalThis.JssssKit.wipFiber = fiber;
    globalThis.JssssKit.hookIndex = 0;
    globalThis.JssssKit.wipFiber.hooks = [];
    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children);
}

/**
 * Updates dom element
 * @param {Object} fiber - JssssKit Element
 */
function updateHostComponent(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    const newChildren = [];
    // flatten children array
    for (let child of fiber.props.children) {
        if (child instanceof Array) {
            child.forEach(c => newChildren.push(c));
        } else {
            newChildren.push(child);
        }
    }
    reconcileChildren(fiber, newChildren);
}

export {
    updateFunctionComponent,
    updateHostComponent,
    updateClassComponent
}