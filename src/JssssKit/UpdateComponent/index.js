import { createDom } from '../CreateDom'
import { reconcileChildren } from '../ReconcileChildren'
import x from '../vars'
function updateFunctionComponent(fiber) {
  window.JssssKit.wipFiber = fiber;
  window.JssssKit.hookIndex = 0;
  window.JssssKit.wipFiber.hooks = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const newChildren = []
  
  for( let child of fiber.props.children ) {
    if( child instanceof Array ) {
      child.forEach( c => newChildren.push(c) );
    } else {
      newChildren.push( child );
    }
  }
  reconcileChildren(fiber, newChildren);
}
export {
  updateFunctionComponent,
  updateHostComponent,
}