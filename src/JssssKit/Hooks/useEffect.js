/**
 * updates state of function component
 * @param {Object} initial - Initial state of a property
 * @return {[Object, function]} state of property and setter
 */
const useEffect = (initial) => {
    // Get info from previous hook state
    const oldHook =
        globalThis.JssssKit.wipFiber.alternate &&
        globalThis.JssssKit.wipFiber.alternate.hooks &&
        globalThis.JssssKit.wipFiber.alternate.hooks[globalThis.JssssKit.hookIndex];
    // Init new hook
    const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: []
    };
    // Process all actions (runs when component is rendered)
    const actions = oldHook ? oldHook.queue : [];
    actions.forEach(action => {
        hook.state = action(hook.state);
    });
    //Setter
    const setState = action => {
        // Adds action in queue to dispatch
        hook.queue.push(action);
        // Sets new wipRoot
        globalThis.JssssKit.wipRoot = {
            dom: globalThis.JssssKit.currentRoot.dom,
            props: globalThis.JssssKit.currentRoot.props,
            alternate: globalThis.JssssKit.currentRoot
        };
        globalThis.JssssKit.nextUnitOfWork = globalThis.JssssKit.wipRoot;
        globalThis.JssssKit.deletions = [];
    };
    // Updates wipFiber
    globalThis.JssssKit.wipFiber.hooks.push(hook);
    globalThis.JssssKit.hookIndex++;

    return [hook.state, setState];
};

export {
    useState
};