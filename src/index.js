import JssssKit from './JssssKit';
import './style.sass';
import UserPage from './UserPage';
import Counter from './counterExample'
const App = () => (
    <div className='app-holder'>
        {/*<UserPage/>*/}
        <Counter/>
    </div>
);

JssssKit.render(<App/>, document.getElementById('root'));
