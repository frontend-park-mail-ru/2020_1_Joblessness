import JssssKit from '../../../JssssKit'
import './style.sass'

const UserName = ({userName, to}) => (
    <h1 className='user-name'>
        { to ? <a href={to}>{userName}</a> : userName }
    </h1>
)

export default UserName