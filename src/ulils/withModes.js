import {Navigator} from '../Navigator';

export const withModes = (Wrappee, initModeEvents = [],
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
          ...rest
        })
      );

      this.props.mode = this.#currentMode;
      this.props.permissions = this.#currentPermissions;
      this.props.setMode = (mode) => {
        this.#currentMode = mode;

        this.props.mode = this.#currentMode;
        this.props.permissions = this.#currentPermissions;
      };
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
          if(initOn.length === 0 ||
            ~initOn.indexOf(this.#currentMode) ||
            ~initOn.indexOf(this.#currentPermissions)) {
            const parent = document.querySelector(this.container);
            const elem = parent.querySelector(selector);
            elem?.addEventListener(eventName, event)
          }
        }
      );

    }
  }
};