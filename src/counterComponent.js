import {Component} from './JssssKit'

class Counter extends Component {

    state = {
        state: 1,
        state2: 20,
    };

    constructor(props) {
        super(props)
    }

    onClick1 = () => {
        this.setState(state => {
            console.log(this.state);
            return {
                state: state.state + 1
            }
        })
    };
    onClick2 = () => {
        this.setState(state => ({
            state2: state.state2 - 1
        }))
    };

    render() {
        return (
            <h1 className='red' onClick={this.props.handle && this.onClick1}>
                {this.state.state}
                {this.props.children}
            </h1>
        );
    }
}

export {
  Counter
}