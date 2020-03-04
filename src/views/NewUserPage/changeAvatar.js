import {currentSession, fileToB64} from '../../ulils';

export const changeAvatar = async (e, page) => {
  const data = new FormData();
  data.append('file', e.target.files[0]);
  // @TODO refactor
  fetch(`http://91.210.170.6:8000/api/users/${currentSession.user.id}/avatar`, {
    method: 'POST',
    body: data,
  }).then(async () => {
    const b64 = await fileToB64(e.target.files[0]);
    page.props.userData.user.avatar = b64;
    console.log(page.props);
    page.requestRender();
  }).catch(() => alert('Невозможно изменить аватар'));
};
