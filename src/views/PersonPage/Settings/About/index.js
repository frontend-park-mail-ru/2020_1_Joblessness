import {Page} from '../../../../Page';
import template from './index.pug';
import withLocalStore from '../../localStore';
import {requestManager, uuid, validators, withForm} from '../../../../ulils';
import {validateSelect} from '../../../../ulils/withForm';
import {Navigator} from '../../../../Navigator';
import {getUserId} from '../../getUserId';
import {isCreationPage} from '../../../VacancyPage/isCreationPage';
import {ORGANIZATION, PERSON} from '../../../../CONSTANTS';

const GENDERS = [
  {meaning: '&#9794; Мужчина', value: '0'},
  {meaning: '&#9792; Женщина', value: '1'},
  {meaning: '&#9893; Женщина в теле мужчины', value: '2'},
  {meaning: '&#9890; Мужчина в теле мужчины', value: '3'},
  {meaning: '&#9891; Женщина в теле женщины', value: '4'},
  {meaning: '&#9892; Мужчина в теле женщины', value: '5'},
  {meaning: '&#9894; Несколько мужчин', value: '6'},
  {meaning: '&#9895; Мужчина и женщина', value: '7'},
  {meaning: '&#9896; Женщина в теле мужчины', value: '8'},
  {meaning: '&#9791; Все выше перечисленное', value: '9'},
];
class AboutPage extends Page {
  render() {
    const canChange = currentSession.user.id === Number(getUserId()) &&
      currentSession.user.role === PERSON;
    return template({
      ...this.props,
      GENDERS,
      canChange,
      user: this.props.getStore().user,
    });
  }

  componentDidMount() {
    super.componentDidMount();
    const e = document.getElementById(this.props.inputFields.submitField.id);

    if (e) {
      e.hidden = currentSession.user.id !== Number(getUserId());
    }
  }
}

AboutPage = withLocalStore(AboutPage);

AboutPage = withForm(AboutPage,
    {
      gender: {
        id: uuid(),
        inputValidator: validateSelect,
      },
      day: {
        id: uuid(),
        validator: validators.isDay,
        warnMessage: 'DD',
        defaultValue: (page) => page.props.getStore().user.birthday !== "0001-01-01T00:00:00Z" ? new Date(page.props.getStore().user.birthday).getDate() < 10 ?
          '0' + (new Date(page.props.getStore().user.birthday).getDate()) : new Date(page.props.getStore().user.birthday).getDate() : '',
      },
      month: {
        id: uuid(),
        validator: (s) => validators.isMonthId(Number(s) - 1),
        warnMessage: 'MM',
        defaultValue: (page) => page.props.getStore().user.birthday !== "0001-01-01T00:00:00Z" ?
          new Date(page.props.getStore().user.birthday).getMonth() + 1 < 10 ? '0' + (new Date(page.props.getStore().user.birthday).getMonth() + 1) :
            new Date(page.props.getStore().user.birthday).getMonth() + 1 : '',
      },
      year: {
        id: uuid(),
        validator: validators.isYear,
        warnMessage: 'YYYY',
        defaultValue: (page) => page.props.getStore().user.birthday !== "0001-01-01T00:00:00Z" ? new Date(page.props.getStore().user.birthday).getFullYear() : '',
      },
    },
    {
      id: uuid(),
    },
    (form, page) => {
      const user = page.props.getStore().user;
      if (!form.gender) {
        delete form.gender;
      }
      if (form.gender === user.gender) {
        delete form.gender;
      }
      if (form.day && form.year && form.month) {
        const oldBirth = new Date(user.birthday);
        const newBirth = new Date(Number(form.year), Number(form.month) - 1, Number(form.day) + 1 );
        if (
          oldBirth.getFullYear() === newBirth.getFullYear() &&
        oldBirth.getMonth() === newBirth.getMonth() &&
        oldBirth.getDate() === newBirth.getDate()
        ) {
          delete form.day;
          delete form.year;
          delete form.month;
        } else {
          form.birthday = newBirth.toJSON();
          delete form.day;
          delete form.year;
          delete form.month;
        }
      } else {
        delete form.day;
        delete form.year;
        delete form.month;
      }
      if (form.birthday || form.gender) {
        requestManager.tryChangePerson(form)
            .then((r) => {
              if (form.birthday && form.gender) {
                alert('Пол и дата рождения изменены', 'success');
              } else if (form.birthday) {
                alert('Дата рождения изменена', 'success');
              } else {
                alert('Пол изменен', 'success');
              }
              page.props.setStore((s) => ({
                user: {
                  ...s.user,
                  ...form,
                },
              }));
              Navigator.updateAllPages();
            })
            .catch((r) => {
              alert('Не удалось изменить данные');
            });
      }
    },
);
export {
  AboutPage,
};
