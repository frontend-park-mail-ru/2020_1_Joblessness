import JssssKit, { useState } from './JssssKit'
import './style.sass'
const Counter = ({text})=> {
  const [state, setState] = useState(1);
  const [state2, setState2] = useState(20)
  return (
    state < state2 &&
    <h1 className='red' onClick={() => setState(c => c + 1)}>
      Count: {state}{text}
      <h1 className='red' onClick={() => setState2(c => c - 1)}>
        Count: {state2}{text}
      </h1>
    </h1>
  );
}
export default Counter
