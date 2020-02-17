import JssssKit from '../../JssssKit'
import './style.sass'
import UserName from './UserName'

const SmallUserName = ({userName, to, ...rest}) => (
    <h2 {...rest} >
        <a href={to}>
            {userName}
        </a>
    </h2>
)

const MediumUserName = ({userName, ...rest}) => (
    <div className='username-medium'>
        <UserName {...rest} userName={userName}/>
    </div>
)

const LargeUserName = ({userName, ...rest}) => (
    <div className='username-large'>
        <UserName {...rest} userName={userName}/>
    </div>
)

export {
    SmallUserName,
    MediumUserName,
    LargeUserName
}