import JssssKit from './index'
if(!window.JssssKit) {
  window.JssssKit = {
    wipFiber: null, // To track work progress. (Work In Progress Fiber)
    hookIndex: null, // To identify hook in component. UseState can be used multiple times
    deletions : [], // Array for tracking nodes to be deleted
    nextUnitOfWork : null, // Next Unit to be rendered (Since we devide rendering process)
    currentRoot : null, // To track Root component
    wipRoot :  null, // To track work progress. (Work In Progress Root),
    timesImported : 1,
    stateIndex : null
  };
} else {
  ++window.JssssKit.timesImported;
}
// window.JssssKit = {
//   wipFiber: window.JssssKit.wipFiber || null, // To track work progress. (Work In Progress Fiber)
//   hookIndex: window.JssssKit.hookIndex || null, // To identify hook in component. UseState can be used multiple times
//   deletions : window.JssssKit.deletions || [], // Array for tracking nodes to be deleted
//   nextUnitOfWork : window.JssssKit.nextUnitOfWork || null, // Next Unit to be rendered (Since we devide rendering process)
//   currentRoot : window.JssssKit.currentRoot || null, // To track Root component
//   wipRoot : window.JssssKit.wipRoot || null, // To track work progress. (Work In Progress Root),
//   wasImported : window.JssssKit.wasImported  ? window.JssssKit.wasImported + 1 : 1
// }
export default {
  // wipFiber,
  // hookIndex
}