import {currentSession} from './currentSession';
import {Navigator} from '../Navigator';
import {uuid} from './uuid';

const withAuthManager = (Wrapee, changeEvent) => {
  return class extends Wrapee {
    constructor(props) {
      super(props);
      this.props.user = currentSession.user;
      const onChange = () => {
        this.props.user = currentSession.user;
        if(changeEvent) {
          if(changeEvent(this, currentSession.user)) {
            Navigator.updateAllPages();
          }
        } else {
          this.needUpdate();
          Navigator.updateAllPages();
        }
      };
      currentSession.addEventListener('change', onChange);
    }
  };
};
export {
  withAuthManager,
};
