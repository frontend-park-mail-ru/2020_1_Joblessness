import {currentSession, fileToB64} from '../../ulils';
import {request} from '../../ulils';

/**
 * open settings on click
 * @param {event} e
 * @param {Page} page
 */
export const onOpenSettingsRequest = (e, page) => {
  const settings = document.getElementById('user-page-modal');
  settings.style.display = 'flex';

  const toggleWindow = (e) => {
    if (e.target === settings) {
      settings.style.display = 'none';
      settings.removeEventListener('click', toggleWindow);
    }
  };

  settings.addEventListener('click', toggleWindow);
};

/**
 * upload avatar on server
 * @param {event} e
 * @param {Page} page
 * @return {Promise<void>}
 */
export const onUpdateAvatarRequest = async (e, page) => {
  const b64 = await fileToB64(e.target.files[0]);

  request.post(`/api/users/${currentSession.user.id}/avatar`, {
    avatar: b64,
  }).then(() => {
    page.props.userData.user.avatar = b64;
    console.log(page.props);
    page.requestRender();
  }).catch(() => alert('Невозможно изменить аватар'));
};

/**
 * send data to server, update page.
 * @param {event}event
 * @param {Page}that
 * @param {Object}field
 * @param {function} callWarnings
 */
export const onSettingsChangeRequest = (event, that, field, callWarnings) => {
  const {validateFirstName, validateLastName, validatePassword} = field;

  if (validateFirstName && validateLastName && validatePassword) {
    request.post(`/api/user/${currentSession.user.id}`, {
      'first-name': validateFirstName,
      'last-name': validateLastName,
    }).then(console.log).catch(console.log);
    // Optimistic update
    that.props.userData.user.firstname = validateFirstName;
    that.props.userData.user.lastname = validateLastName;
    // Rerender page with new Data
    that.showPage();
    that.componentDidMount();
  } else {
    // Turn input fields red
    callWarnings();
  }
};
