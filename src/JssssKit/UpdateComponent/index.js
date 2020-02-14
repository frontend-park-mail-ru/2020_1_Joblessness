import { createDom } from '../CreateDom'
import { reconcileChildren } from '../ReconcileChildren'

function updateClassComponent(fiber) {
  if( !fiber.instance ) {
    fiber.instance = new fiber.type(fiber.props)
    // fiber.type = new fiber.type(fiber.props)
  }
  window.JssssKit.wipFiber = fiber;
  // window.JssssKit.wipFiber.state = fiber.type.state;
  fiber.instance.props = fiber.props
  const children = [fiber.instance.requestRender.apply(fiber.instance)]
  reconcileChildren(fiber, children);
}

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
  updateClassComponent
}