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
const fileToB64 = (file) => new Promise(
    //https://gist.github.com/n1ru4l/dc99062577b746e0783410b1298ab897
    (resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }
);
export const onUpdateAvatarRequest = async (e, page) => {
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('name', 'some value user types');
    formData.append('description', 'some value user types');
    const b64 = await fileToB64(e.target.files[0]);
    let r = await fetch('/api/setAvatar', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: {
            avatar: b64
        }
    });
    r = await r.json();
    //@TODO load from server
    page.props.userData.user.avatar = b64;
    console.log(page.props);
    page.requestRender();
};


export const onSettingsChangeRequest = (event, that, field, callWarnings) => {
    const {validateFirstName, validateLastName, validatePassword} = field;
    if (validateFirstName && validateLastName && validatePassword) {
        //@TODO send request on server
        //Optimistic update
        that.props.userData.user.firstname = validateFirstName;
        that.props.userData.user.lastname = validateLastName;
        //Rerender page with new Data
        that.requestRender()
    } else {
        // Turn input fields red
        callWarnings()
    }
};