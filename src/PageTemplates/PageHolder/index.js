import JssssKit from '../../JssssKit'
import './style.sass'
function PageHolder(WrappedComponent) {
  
  return ({...props}) => {
    return(
      <div className='page-holder'>
        <WrappedComponent { ...props }/>
      </div>
    )
  }
}
export default PageHolder