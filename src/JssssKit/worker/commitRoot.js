import {commitWork} from './index';

/**
 * Compares props and removes outdated properties
 */
function commitRoot() {
    window.JssssKit.deletions.forEach(commitWork);
    commitWork(window.JssssKit.wipRoot.child);
    window.JssssKit.currentRoot = window.JssssKit.wipRoot;
    window.JssssKit.wipRoot = null;
}

export {
    commitRoot
}