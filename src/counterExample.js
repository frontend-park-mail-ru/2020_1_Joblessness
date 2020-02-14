import JssssKit, { useState } from './JssssKit'
import './style.sass'
const Counter = ({text, children})=> {
  const [state, setState] = useState(1);
  return (
    <h1 className='red' onClick={e => setState( s => s + 1)}>
      <p>Hello</p>
      {state}
      {children}
      <h2>World</h2>
    </h1>
  );
}
export default Counter
