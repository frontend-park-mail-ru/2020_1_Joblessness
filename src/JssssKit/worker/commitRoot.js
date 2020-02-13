import { commitWork } from './index'

function commitRoot() {
  window.JssssKit.deletions.forEach(commitWork);
  commitWork(window.JssssKit.wipRoot.child);
  window.JssssKit.currentRoot = window.JssssKit.wipRoot;
  window.JssssKit.wipRoot = null;
}
export {
  commitRoot
}