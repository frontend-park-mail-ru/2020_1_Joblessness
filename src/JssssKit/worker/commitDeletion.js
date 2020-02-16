/**
 * Removes child from dom element
 * @param {Object} fiber - current fiber
 * @param {HTMLElement} domParent - parent element
 */
function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom);
    } else {
        commitDeletion(fiber.child, domParent);
    }
}

export {
    commitDeletion
}