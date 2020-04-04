import {currentSession} from './currentSession';
import {Navigator} from '../Navigator';

const updateEvent = ()=> Navigator.updateAllPages;
currentSession.addEventListener('change', updateEvent);
const withAuthManager = (Wrapee) => {
  return class extends Wrapee {

    constructor(props) {
      super(props);
      this.props.user = currentSession.user;
      const onChange = () => {
        this.props.user = currentSession.user;
      };
      currentSession.removeEventListener('change', updateEvent);
      currentSession.addEventListener('change', onChange);
      currentSession.addEventListener('change', updateEvent);
    }

  }
}
export {
  withAuthManager
}