import { workLoop } from '../worker'
// window.requestIdleCallback(workLoop);

const render = (element, container) => {
  window.JssssKit.wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: window.JssssKit.currentRoot
  };
  window.JssssKit.deletions = [];
  window.JssssKit.nextUnitOfWork = window.JssssKit.wipRoot;
}

export {
  render
}