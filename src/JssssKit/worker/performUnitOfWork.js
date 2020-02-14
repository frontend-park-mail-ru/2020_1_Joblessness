import x from '../vars'
import {
  updateClassComponent,
  updateFunctionComponent,
  updateHostComponent
} from '../UpdateComponent'

const performUnitOfWork = (fiber) => {
  const isClassComponent = fiber.type && fiber.type.isClassComponent;
  const isFunctionComponent = fiber.type instanceof Function && !isClassComponent;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else if(isClassComponent) {
    updateClassComponent(fiber)
  } else {
    updateHostComponent(fiber);
  }
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}
export {
  performUnitOfWork
}