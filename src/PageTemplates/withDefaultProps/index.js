import JssssKit from '../../JssssKit'

const withDefaultProps = (WrappedComponent, defaultProps) =>(
  ({...props}) => (
    <WrappedComponent{...defaultProps}{...props}/>
  )
)
export {
  withDefaultProps
}