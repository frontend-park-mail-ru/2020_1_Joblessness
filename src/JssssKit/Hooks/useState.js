const useState = (initial) => {
  const oldHook =
    window.JssssKit.wipFiber.alternate &&
    window.JssssKit.wipFiber.alternate.hooks &&
    window.JssssKit.wipFiber.alternate.hooks[window.JssssKit.hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  };
  
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = action(hook.state);
  });
  
  const setState = action => {
    hook.queue.push(action);
    window.JssssKit.wipRoot = {
      dom: window.JssssKit.currentRoot.dom,
      props: window.JssssKit.currentRoot.props,
      alternate: window.JssssKit.currentRoot
    };
    window.JssssKit.nextUnitOfWork = window.JssssKit.wipRoot;
    window.JssssKit.deletions = [];
  };
  
  window.JssssKit.wipFiber.hooks.push(hook);
  window.JssssKit.hookIndex++;
  return [hook.state, setState];
}

export {
  useState
}