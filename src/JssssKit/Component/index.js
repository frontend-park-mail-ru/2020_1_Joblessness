import { UPDATE } from '../typedefs'

class Component {
  
  static isClassComponent = true
  state = null
  componentWillMount = null
  componentDidMount = null
  
  componentWillUnmount = () => {
    console.log('willUnmount')
  }

  constructor(children, ...props) {
  }

  setState(st) {
    const oldState =
      window.JssssKit.wipFiber.alternate &&
      window.JssssKit.wipFiber.alternate.state &&
      window.JssssKit.wipFiber.alternate.state;
    console.log(JssssKit)
    const state = {
      ...this.state,
      ...(typeof st === 'function' ? st(this.state) : st),
    };
    if(window.JssssKit.wipFiber.alternate) {
      window.JssssKit.wipFiber.alternate.state = state
      window.JssssKit.wipFiber.alternate.instance.state = state
      // this.state = state
      console.log(window.JssssKit.wipFiber)
    }
    // window.JssssKit.wipRoot = {...window.JssssKit.currentRoot}
    // console.log(window.JssssKit.wipRoot.child)
    window.JssssKit.wipFiber.instance.state = state
    window.JssssKit.wipRoot = {
      dom: window.JssssKit.currentRoot.dom,
      props: window.JssssKit.currentRoot.props,
      alternate: window.JssssKit.currentRoot,
      // child: this
    };
    window.JssssKit.nextUnitOfWork = window.JssssKit.wipRoot;
    window.JssssKit.deletions = [];

    // window.JssssKit.wipFiber.state = state;
    // window.JssssKit.wipFiber.instance.state = state
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
    console.log('render')
    return null
  }
}
export {
  Component
}