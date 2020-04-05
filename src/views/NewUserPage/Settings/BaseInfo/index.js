import {Page} from '../../../../Page';
import template from './index.pug';
import withLocalStore from '../../localStore';
import {requestManager, uuid, validators, withForm} from '../../../../ulils';
import {Navigator} from '../../../../Navigator';

class BaseInfoPage extends Page {

  render() {
    return template(this.props);
  }
}

BaseInfoPage = withLocalStore(BaseInfoPage);

BaseInfoPage = withForm(BaseInfoPage,
  {
    firstName: {
      id: uuid(),
      validator: validators.isName,
      warnMessage: 'Имя должно состоять только из букв и пробелов',
      defaultValue: (page) => page.props?.getStore()?.user?.firstName ?? '',
    },
    lastName: {
      id: uuid(),
      validator: validators.isName,
      warnMessage: 'Фамилия должна состоять только из букв и пробелов',
      defaultValue: (page) => page.props?.getStore()?.user?.lastName ?? '',
    },
  },
  {
    id: uuid(),
    eventName: 'click',
  },
  (form, page) => {
    const user = page.props.getStore().user;

    if(!user.firstName)
      delete user.firstName;
    if(!user.lastName)
      delete user.lastName;

    if(user.firstName === form.firstName)
      delete form.firstName;
    if(user.lastName === form.lastName)
      delete form.lastName;

    if(!form.firstName && !form.lastName)
      return;

    requestManager
      .tryChangePerson(form)
      .then(() => {
        if(form.firstName && form.lastName) {
          alert('Имя и Фамилия изменены');
        } else if(form.firstName) {
          alert('Имя изменено');
        } else {
          alert('Фамилия изменена');
        }
        page.props.setStore(s => ({
          user: {
            ...s.user,
            ...form,
          }
        }));
        Navigator.updateAllPages();
      })
      .catch(() => alert('Не удалось изменить данные'))
  }
);
export {
  BaseInfoPage
}