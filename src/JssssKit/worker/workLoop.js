import {commitRoot, performUnitOfWork} from './index';

/**
 * constantly checks for updates
 * @param {Object} deadline - argument passed by requestIdleCallback
 */
const workLoop = (deadline) => {
    let shouldYield = false;
    while (globalThis.JssssKit.nextUnitOfWork && !shouldYield) {
        globalThis.JssssKit.nextUnitOfWork = performUnitOfWork(globalThis.JssssKit.nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }

    if (!globalThis.JssssKit.nextUnitOfWork && globalThis.JssssKit.wipRoot) {
        commitRoot();
    }

    globalThis.requestIdleCallback(workLoop);
};
export {
    workLoop
}