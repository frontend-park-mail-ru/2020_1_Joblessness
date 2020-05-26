import {Page} from '../../../../Page';
import template from './index.pug';
import {withAuthManager} from '../../../../ulils/AuthManager';
import {getUserId} from '../../../PersonPage/getUserId';
import {DECLINE, PREVIEW} from '../../../../CONSTANTS';

class ModeManager extends Page {
  render() {
    return template({
      ...this.props,
      currentId: this.props.getStore().user.id,
    });
  }
  componentWillMount() {
    super.componentWillMount();
    if ( this.props.getStore().user.id !== this.props.user.id && this.props.mode !== PREVIEW) {
      this.props.setMode(PREVIEW);
      this.props.requestNextNoUpdate(this, PREVIEW, DECLINE);
    }
  }
}

ModeManager = withAuthManager(ModeManager);

export {
  ModeManager,
};
