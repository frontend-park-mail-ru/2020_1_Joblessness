import {DELETION, PLACEMENT, UPDATE} from '../typedefs'

/**
 * reconciles children
 * Compares fiber to previous state and decides whether
 * DELETION, PLACEMENT or UPDATE is needed
 * @param {Object} wipFiber - current node to be updated
 * @param {Array} elements - children of current node
 */

//@TODO when using setstate in class components should
//@TODO place tag update on rerender + store the same DOM.
//@TODO Somthing needs to be changed
const reconcileChildren = (wipFiber, elements) => {
    let index = 0;
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
    let prevSibling = null;
    while (index < elements.length || oldFiber != null) {
        const element = elements[index];
        let newFiber = null;

        const sameType =
            oldFiber &&
            element &&
            (element.type === oldFiber.type);
        if (sameType) {
            // Should only update dom element
            newFiber = {
                // ...oldFiber,
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: UPDATE
            };
        }
        // if (element && !sameType && element.isClassComponent)
        //     console.log(wipFiber)
        if (element && !sameType) {
            newFiber = {
                // ...oldFiber,
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
                effectTag: DELETION,
            };
            globalThis.JssssKit.deletions.push(oldFiber);
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
};

export {
    reconcileChildren
};