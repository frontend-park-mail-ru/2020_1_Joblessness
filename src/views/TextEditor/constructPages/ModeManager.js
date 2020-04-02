import {
  DECLINE,
  EDIT,
  ORGANIZATION,
  PREVIEW,
  SUBMIT
} from '../../../CONSTANTS';
import {withModes} from '../../../ulils';

const initEditModeEvent = (page) => (e) => {
  page.props.requestNextNoUpdate(page, EDIT);
  page.setMode(EDIT)
};

const initApplyEvent = (page) => e => {
  page.props.requestNextNoUpdate(page, PREVIEW, SUBMIT);
  page.setMode(PREVIEW)
};
const initCancelEvent = (page) => e => {
  page.props.requestNextNoUpdate(page, PREVIEW, DECLINE);
  page.setMode(PREVIEW)
};

export const modeManager = (Wrapee, props) => {
  Wrapee = props.withLocalStore(Wrapee);
  Wrapee = withModes(Wrapee,
    [
      {
        event: initEditModeEvent,
        selector: '.edit-button',
        initOn: [PREVIEW],
      },
      {
        event: initApplyEvent,
        selector: '.apply-button',
        initOn: [EDIT]
      },
      {
        event: initCancelEvent,
        selector: '.cancel-button',
        initOn: [EDIT]
      }
    ],
    PREVIEW, ORGANIZATION);

  const wrapee = new Wrapee(props.MODE_MANAGER_SELECTOR);
  wrapee.props.editorProps = props;
  return wrapee;
}