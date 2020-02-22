export const onOpenSettingsRequest = (e, page) => {
    const settings = document.getElementById('user-page-modal');
    settings.style.display = 'flex';
    const toggleWindow = (e) => {
        if (e.target === settings) {
            settings.style.display = 'none';
            settings.removeEventListener('click', toggleWindow)
        }
    };
    settings.addEventListener('click', toggleWindow)
};
export const onUpdateAvatarRequest = (e, page) => {
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('name', 'some value user types');
    formData.append('description', 'some value user types');
    console.log(e.target.files[0]);

    fetch('/api/setAvatar', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: {
            avatar: e.target.files[0]
        }
    })
        .then(r => r.json())
        .then(d => {
            console.log(d);
            //@TODO load from server
            page.props.userData.user.avatar = e.target.files[0].name;
            console.log(page.props);
            page.requestRender()
        })
        .catch(console.log)
};