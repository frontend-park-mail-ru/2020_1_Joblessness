import JssssKit from '../../JssssKit'
import {LargeAvatar} from '../../PageTemplates/Avatars'
import {MediumUserName, SmallUserName} from '../../PageTemplates/Usernames'
import {withDefaultProps} from '../../PageTemplates/withDefaultProps'
import testUser from '../testUser'
import './style.sass'
import Menu from '../Menu'

const Bio = ({children, firstName, lastName, tag, avatar}) => {
    return (
        <div className='bio-section'>
            <div className='avatar-section'>
                <LargeAvatar src={avatar} srcSet={avatar} alt={avatar}/>
            </div>
            <div className='menu-user-holder'>
                <div className='username-section'>
                    <MediumUserName userName={firstName} to={'/'}/>
                    <MediumUserName userName={lastName} to={'/'}/>
                    <SmallUserName userName={tag} to={'/'}/>
                </div>
                <Menu/>
            </div>
            {children}
        </div>
    )
};

export default withDefaultProps(Bio, testUser)