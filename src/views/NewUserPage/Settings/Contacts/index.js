import {Page} from '../../../../Page';
import template from './index.pug';
import withLocalStore from '../../localStore';
import {requestManager, uuid, validators, withForm} from '../../../../ulils';
import {Navigator} from '../../../../Navigator';

class ContactsPage extends Page {
  render() {
    return template(this.props);
  }
}

ContactsPage = withLocalStore(ContactsPage);

ContactsPage = withForm(ContactsPage,
  {
    email: {
      id: uuid(),
      validator: validators.isEmail,
      warnMessage: 'Например username@example.com',
      defaultValue: (page) => page.getStore().user.email ?? '',
    },
    phone: {
      id: uuid(),
      validators: validators.isPhoneNumber,
      warnMessage: 'Например +7(912)345-67-89 или +79123456789',
      defaultValue: (page) => page.getStore().user.phone ?? '',
    }
  },
  {
    id: uuid(),
  },
  (form, page) => {
  const user = page.props.getStore();

  if(!form.email)
    delete form.email;
  if(!form.phone)
    delete form.phone;

  if(form.email === user.email)
    delete form.email;
  if(form.phone === user.phone)
    delete form.phone;

  requestManager
    .tryChangePerson(form)
    .then(r => {
      if(form.email && form.phone) {
        alert('Телефон и email изменены');
      } else if(form.email) {
        alert('email измененен');
      } else {
        alert('Телефон изменен');
      }
      page.props.setStore(s => ({
        user: {
          ...s.user,
          ...form,
        }
      }));
      Navigator.updateAllPages();
    })
  }
);

export {
  ContactsPage
}