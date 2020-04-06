import {DECLINE, EDIT, PREVIEW, SUBMIT} from '../../../../CONSTANTS';
import {Navigator} from '../../../../Navigator';

const PLAY_REMOVE_ANIMATION = (props) => {
  const holders = document.getElementsByClassName('paragraph-holder');
  Array.from(holders).forEach((h) => {
    if (!h?.lastElementChild?.firstChild?.innerHTML) {
      h.classList.add('removing-empty');
    }
    h.classList.add('removing');
  });
  document.getElementById(props.ADD_PARAGRAPH_ID)
    ?.classList.add('removing-o');
};

const REMOVING_ANIMATION_DURATION = 500;


export const createBeforeNext = (props) => (rootPage, page, mode, status) => {
  if (mode === EDIT) {
    Navigator.removeRoutes(props.PREVIEW_MODE_ROOT);
    Navigator.addRoutes(props.EDIT_MODE_ROUTE);
    // Navigator.updateAllPages();
  } else if (mode === PREVIEW) {
    // Removing animation
    PLAY_REMOVE_ANIMATION(props);
    Navigator.removeRoutes(props.EDIT_MODE_ROOT);
    setTimeout(() => {
      if (status === SUBMIT) {
        // @TODO send request
        rootPage.props.setStore(props.SUBMIT_REDUCER);
      }

      if (status === DECLINE) {
        rootPage.props.setStore(props.DECLINE_REDUCER);
      }
      Navigator.addRoutes(props.PREVIEW_MODE_ROUTE);
      Navigator.updateAllPages();
    },
    REMOVING_ANIMATION_DURATION);
  }
};
