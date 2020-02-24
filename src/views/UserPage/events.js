import {fileToB64} from '../../ulils';
import {postRequest} from '../../ulils/postRequest';

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
export const onUpdateAvatarRequest = async (e, page) => {
  const formData = new FormData();
  formData.append('file', e.target.files[0]);
  formData.append('name', 'some value user types');
  formData.append('description', 'some value user types');
  const b64 = await fileToB64(e.target.files[0]);
  postRequest('/api/users/2/avatar', {
    avatar: b64,
  }).then(() => {
    page.props.userData.user.avatar = b64;
    console.log(page.props);
    page.requestRender();
  }).catch(() => alert('Невозможно изменить аватар'));
};


export const onSettingsChangeRequest = (event, that, field, callWarnings) => {
  const {validateFirstName, validateLastName, validatePassword} = field;
  if (validateFirstName && validateLastName && validatePassword) {
    // @TODO send request on server
    postRequest('/api/user/2', {
      'first-name': validateFirstName,
      'last-name': validateLastName,
    }).then(console.log)
        .catch(console.log);
    // Optimistic update
    that.props.userData.user.firstname = validateFirstName;
    that.props.userData.user.lastname = validateLastName;
    // Rerender page with new Data
    that.requestRender();
  } else {
    // Turn input fields red
    callWarnings();
  }
};
