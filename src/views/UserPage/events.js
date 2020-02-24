import {fileToB64} from '../../ulils';

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
  fetch('http://91.210.170.6:8000/api/users/1/avatar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://91.210.170.6:8000',
    },
    mode: 'no-cors',
    body: {
      avatar: b64,
    },
  }).catch(console.log);
  // const r = await r.json()
  //     .catch(console.log);

  // @TODO load from server
  page.props.userData.user.avatar = b64;
  console.log(page.props);
  page.requestRender();
};


export const onSettingsChangeRequest = (event, that, field, callWarnings) => {
  const {validateFirstName, validateLastName, validatePassword} = field;
  if (validateFirstName && validateLastName && validatePassword) {
    // @TODO send request on server
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
