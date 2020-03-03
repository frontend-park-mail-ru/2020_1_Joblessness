import {currentSession, fileToB64, request} from '../../ulils';

export const changeAvatar = async (e, page) => {

  const data = new FormData();
  data.append('file', e.target.files[0]);

  fetch('http://localhost:8001/api/users/1/avatar', {
    method: 'POST',
    body: data,
  }).then(async () => {
    const b64 = await fileToB64(e.target.files[0]);
    page.props.userData.user.avatar = b64;
    console.log(page.props);
    page.requestRender();
  }).catch(() => alert('Невозможно изменить аватар'));
};