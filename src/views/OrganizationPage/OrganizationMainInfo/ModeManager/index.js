import {Page} from '../../../../Page';
import template from './index.pug'
import {withModes} from '../../../../ulils';

// Modes
import withLocalStore from '../localStore';
const PREVIEW = 'PREVIEW';
const EDIT = 'EDIT';
// Permissions
const UNAUTHORISED = 'UNAUTHORISED';
const PERSON = 'PERSON';
const DECLINE = 'DECLINE';
const COMPANY = 'COMPANY';
const SUBMIT = 'SUBMIT';

const initEditModeEvent = (page) => (e) => {
  page.props.requestNextNoUpdate(page, EDIT);
  page.setMode(EDIT);
};

const initApplyEvent = (page) => (e) => {
  page.props.requestNextNoUpdate(page, PREVIEW, SUBMIT);
  page.setMode(PREVIEW);
};
const initCancelEvent = (page) => (e) => {
  page.props.requestNextNoUpdate(page, PREVIEW, DECLINE);
  page.setMode(PREVIEW);
};

class ModeManager extends Page {
  render() {
    return template(this.props);
  }
}

ModeManager = withModes(ModeManager,
    [
      {
        event: initEditModeEvent,
        selector: '.edit-button',
        initOn: [PREVIEW],
      },
      {
        event: initApplyEvent,
        selector: '.apply-button',
        initOn: [EDIT],
      },
      {
        event: initCancelEvent,
        selector: '.cancel-button',
        initOn: [EDIT],
      },
    ],
    PREVIEW, COMPANY);

ModeManager = withLocalStore(ModeManager);

export {
  ModeManager,
};
