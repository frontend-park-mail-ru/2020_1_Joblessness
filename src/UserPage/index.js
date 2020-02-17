import JssssKit from '../JssssKit'
import { PageHolder } from '../PageTemplates'
import './style.sass'
import Bio from './Bio'
import Menu from './Menu'
import Summaries from './Summaries'

const UserPage = () => (
  <div className='user-page'>
    <Bio/>
    {/*<Summaries/>*/}
  </div>
);

export default PageHolder(UserPage)