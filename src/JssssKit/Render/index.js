/**
 * renders JssssKit elements on page
 * @param {Object} element - element to be rendered on page
 * @param {HTMLElement} container - parent node for all elements
 */
const render = (element, container) => {
    globalThis.JssssKit.wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: globalThis.JssssKit.currentRoot
    };
    globalThis.JssssKit.deletions = [];
    globalThis.JssssKit.nextUnitOfWork = globalThis.JssssKit.wipRoot;
};

export {
    render
};