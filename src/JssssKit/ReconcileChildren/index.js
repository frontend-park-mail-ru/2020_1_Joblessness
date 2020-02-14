import { UPDATE, PLACEMENT, DELETION } from '../typedefs'
import x from '../vars'
const reconcileChildren = (wipFiber, elements) => {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;
  
  while ( index < elements.length || oldFiber != null ) {
    const element = elements[ index ];
    let newFiber = null
    
    const sameType =
      oldFiber &&
      element &&
      (element.type === oldFiber.type || element.instance === oldFiber.instance);
  
    if (sameType) {
      newFiber = {
        ...oldFiber,
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: UPDATE
      };
    }
    if( element && !sameType && element.isClassComponent)
      console.log(wipFiber)
    if (element && !sameType) {
      newFiber = {
        ...oldFiber,
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: PLACEMENT
      };
    }
    if (oldFiber && !sameType) {
      oldFiber = {
        ...oldFiber,
        effectTag : DELETION,
      }
      window.JssssKit.deletions.push(oldFiber);
    }
  
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
  
    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }
  
    prevSibling = newFiber;
    index++;
  }
}

export {
  reconcileChildren
}