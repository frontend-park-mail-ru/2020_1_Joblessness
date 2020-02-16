//@TODO implement setState function
class Component {

    static isClassComponent = true;
    state = null;
    componentWillMount = null;
    componentDidMount = null;

    constructor(children, ...props) {
    }

    componentWillUnmount = () => {
        console.log('willUnmount')
    };

    setState(st) {
        const oldState =
            globalThis.JssssKit.wipFiber.alternate &&
            globalThis.JssssKit.wipFiber.alternate.state &&
            globalThis.JssssKit.wipFiber.alternate.state;
        console.log(oldState);
        const state = {
            ...this.state,
            ...(typeof st === 'function' ? st(this.state) : st),
        };
        if (globalThis.JssssKit.wipFiber.alternate) {
            globalThis.JssssKit.wipFiber.alternate.state = state;
            globalThis.JssssKit.wipFiber.alternate.instance.state = state;
            // this.state = state
            console.log(globalThis.JssssKit.wipFiber)
        }
        // globalThis.JssssKit.wipRoot = {...globalThis.JssssKit.currentRoot}
        // console.log(globalThis.JssssKit.wipRoot.child)
        globalThis.JssssKit.wipFiber.instance.state = state;
        globalThis.JssssKit.wipRoot = {
            dom: globalThis.JssssKit.currentRoot.dom,
            props: globalThis.JssssKit.currentRoot.props,
            alternate: globalThis.JssssKit.currentRoot,
            // child: this
        };
        globalThis.JssssKit.nextUnitOfWork = globalThis.JssssKit.wipRoot;
        globalThis.JssssKit.deletions = [];

        // globalThis.JssssKit.wipFiber.state = state;
        // globalThis.JssssKit.wipFiber.instance.state = state
    }

    requestRender() {
        this.componentWillMount && this.componentWillMount();
        const res = this.render();
        this.componentDidMount && this.componentDidMount();
        return res;
    }

    requestDerender() {
        this.componentWillUnmount && this.componentWillUnmount();
    }

    render() {
        console.log('render');
        return null;
    }
}

export {
    Component
};