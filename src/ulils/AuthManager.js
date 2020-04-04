import {currentSession} from './currentSession';
import {Navigator} from '../Navigator';
import {uuid} from './uuid';

const withAuthManager = (Wrapee) => {
  return class extends Wrapee {

    constructor(props) {
      super(props);
      this.props.user = currentSession.user;
      const onChange = () => {
        this.props.user = currentSession.user;
        this.props.random = uuid();
        Navigator.updateAllPages();
      };
      currentSession.addEventListener('change', onChange);
    }

  }
}
export {
  withAuthManager
}