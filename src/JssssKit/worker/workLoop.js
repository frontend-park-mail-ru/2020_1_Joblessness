import x from '../vars'
import { commitRoot, performUnitOfWork } from './index'

const workLoop = (deadline) => {
  let shouldYield = false;
  while (window.JssssKit.nextUnitOfWork && !shouldYield) {
    window.JssssKit.nextUnitOfWork = performUnitOfWork(window.JssssKit.nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  
  if (!window.JssssKit.nextUnitOfWork && window.JssssKit.wipRoot) {
    commitRoot();
  }
  
  window.requestIdleCallback(workLoop);
}
export {
  workLoop
}