function JssssKit() {
    globalThis.JssssKit = {
        wipFiber: null, // To track work progress. (Work In Progress Fiber)
        hookIndex: null, // To identify hook in component. UseState can be used multiple times
        deletions: [], // Array for tracking nodes to be deleted
        nextUnitOfWork: null, // Next Unit to be rendered (Since we divide rendering process)
        currentRoot: null, // To track Root component
        wipRoot: null, // To track work progress. (Work In Progress Root),
        stateIndex: null
    };
}

export default new JssssKit()