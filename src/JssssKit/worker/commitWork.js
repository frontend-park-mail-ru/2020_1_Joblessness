import {updateDom} from '../UpdateDom';
import {commitDeletion} from './index';
import {DELETION, PLACEMENT, UPDATE} from '../typedefs';

/**
 * Adds, deletes or updates dom element
 * @param {Object} fiber - current node to be updated
 */
function commitWork(fiber) {
    if (!fiber) {
        return;
    }
    let domParentFiber = fiber.parent;
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.dom;
    if (fiber.effectTag === PLACEMENT && fiber.dom != null) {
        domParent.appendChild(fiber.dom);
    } else if (fiber.effectTag === UPDATE && fiber.dom != null) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag === DELETION) {
        commitDeletion(fiber, domParent);
    }

    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

export {
    commitWork
}