import JssssKit from '../../../JssssKit'
import './style.sass'

const MenuItem = ({textValue, to, children, ...rest}) => (
  <div className='menu-item' {...rest}>
    <a href={to}>
      {textValue}
      {children}
    </a>
  </div>
)

export default MenuItem