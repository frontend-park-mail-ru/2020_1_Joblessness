import JssssKit from '../../../JssssKit'
import './style.sass'

const Avatar = ({srcSet, src, to, alt, ...rest}) => (
    <div {...rest} className='avatar-holder'>
        <a href={to}>
            <img src={src} alt={alt} srcSet={srcSet}/>
        </a>
    </div>
)

export default Avatar