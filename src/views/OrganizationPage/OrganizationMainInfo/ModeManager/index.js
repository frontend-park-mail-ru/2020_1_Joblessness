import {Page} from '../../../../Page';
import template from './index.pug';
import {Navigator} from '../../../../Navigator';
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
const withModes = (Wrappee, initModeEvents = [],
    defaultMode = PREVIEW, defaultPermissions = UNAUTHORISED) => {
  return class extends Wrappee {
    #currentMode;
    #currentPermissions;
    #modeEvents;

    constructor(props) {
      super(props);

      this.#currentMode = defaultMode;
      this.#currentPermissions = defaultPermissions;

      this.#modeEvents = initModeEvents.map(({event, ...rest}) => ({
        event: event(this),
        ...rest,
      }),
      );

      this.props.mode = this.#currentMode;
      this.props.permissions = this.#currentPermissions;
    }

    setMode(mode) {
      this.#currentMode = mode;

      this.props.mode = this.#currentMode;
      this.props.permissions = this.#currentPermissions;
      Navigator.updateAllPages();
    }

    componentDidMount() {
      super.componentDidMount();

      this.#modeEvents.map(
          ({eventName = 'click', event, selector, initOn = []}) => {
            if (initOn.length === 0 ||
            ~initOn.indexOf(this.#currentMode) ||
            ~initOn.indexOf(this.#currentPermissions)) {
              const parent = document.querySelector(this.container);
              const elem = parent.querySelector(selector);
              elem.addEventListener(eventName, event);
            }
          },
      );
    }
  };
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
