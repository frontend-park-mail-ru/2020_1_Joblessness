import {
  DECLINE,
  EDIT,
  ORGANIZATION, PERSON,
  PREVIEW,
  SUBMIT,
} from '../../../CONSTANTS';
import {requestManager, withModes} from '../../../ulils';

const initEditModeEvent = (page) => (e) => {
  page.props.requestNextNoUpdate(page, EDIT);
  page.setMode(EDIT);
};

const initApplyEvent = (props) => (page) => (e) => {
  if (props.onApply) {
    props.onApply(props, page).then(
        () => {
          page.props.requestNextNoUpdate(page, PREVIEW, SUBMIT);
          page.setMode(PREVIEW);
        },
    ).catch(
        () => {
          alert('Неудалось обновить данные. Попробуйте еще раз.');
          page.props.requestNextNoUpdate(page, PREVIEW);
          page.setMode(PREVIEW);
        },
    );
  } else {
    page.props.requestNextNoUpdate(page, PREVIEW, SUBMIT);
    page.setMode(PREVIEW);
  }
};
const initCancelEvent = (page) => (e) => {
  page.props.requestNextNoUpdate(page, PREVIEW, DECLINE);
  page.setMode(PREVIEW);
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
          event: initApplyEvent(props),
          selector: '.apply-button',
          initOn: [EDIT],
        },
        {
          event: initCancelEvent,
          selector: '.cancel-button',
          initOn: [EDIT],
        },
      ],
      PREVIEW, PERSON);

  const wrapee = new Wrapee(props.MODE_MANAGER_SELECTOR);
  wrapee.props.editorProps = props;
  return wrapee;
};
