import {Page} from '../../../../Page';
import template from './index.pug';
import {withAuthManager} from '../../../../ulils/AuthManager';
import {getOrgId} from '../../getOrgInfo';
import {DECLINE, PREVIEW} from '../../../../CONSTANTS';

class ModeManager extends Page {
  render() {
    return template({
      ...this.props,
      currentId: Number(getOrgId()),
    });
  }
  componentWillMount() {
    super.componentWillMount();
    if ( Number(getOrgId()) !== this.props.user.id && this.props.mode !== PREVIEW) {
      this.props.setMode(PREVIEW);
      this.props.requestNextNoUpdate(this, PREVIEW, DECLINE);
    }
  }
}

ModeManager = withAuthManager(ModeManager);

export {
  ModeManager,
};
