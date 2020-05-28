import {Page} from '../../../Page';
import './style.sass';
import template from './index.pug';
import {requestManager, uuid, withForm} from '../../../ulils';
import {Navigator} from '../../../Navigator';

class Item extends Page {
  accept;
  decline;
  selectDate;
  declineForm;
  constructor(props) {
    super(props);
    this.accept = uuid();
    this.decline = uuid();
    this.selectDate = uuid();
    this.declineForm = uuid();
  }

  render() {
    return template({
      ...this.props,
      acceptId: this.accept,
      declineId: this.decline,
      selectDateId: this.selectDate,
      declineFormId: this.declineForm,
    });
  }

  componentDidMount() {
    super.componentDidMount();
    const declineForm = this.getContainer().querySelector(`#${this.declineForm}`);
    const accept = this.getContainer().querySelector(`#${this.accept}`);
    const decline = this.getContainer().querySelector(`#${this.decline}`);
    const select = this.getContainer().querySelector(`#${this.selectDate}`);

    select.addEventListener('click', () => {
      accept.classList.add('invisible');
      decline.classList.add('invisible');
      this.getContainer().querySelector('.select-date').classList.remove('invisible');
      select.classList.add('invisible');
    });
    declineForm.addEventListener('click', () => {
      accept.classList.remove('invisible');
      decline.classList.remove('invisible');
      this.getContainer().querySelector('.select-date').classList.add('invisible');
      select.classList.remove('invisible');
    });
    decline.addEventListener('click', declineEvent(this));
    accept.addEventListener('click', submitEvent(this));
  }
}
Item = withForm(Item, {
  day : {
    id: uuid(),
    required: true,
    validator : (n) => n >= 1 && n <= 31,
    warnMessage: 'DD',
    defaultValue: new Date().getDate(),
  },
  month: {
    id: uuid(),
    required: true,
    validator : (n) => n >= 1 && n <= 12,
    warnMessage: 'MM',
    defaultValue: new Date().getMonth() + 1
  },
  year: {
    id: uuid(),
    required: true,
    validator : (n) => n >= new Date().getFullYear() && n <= new Date().getFullYear() + 1,
    warnMessage: 'YYYY',
    defaultValue : new Date().getFullYear()
  },
},
  {
    id: uuid(),
    event : 'click'
  },
  async (form, page) => {
    try {
      const date = new Date(form.year, form.month - 1, form.day);
      const {summaryId,vacancyId} = page.props.info;
      const r = await requestManager.tryResponseSummary(summaryId, {
        interview_date: date.toJSON(),
        vacancyId : Number(vacancyId)
      });
      const accept = page.getContainer().querySelector(`#${page.accept}`);
      const decline = page.getContainer().querySelector(`#${page.decline}`);
      const select = page.getContainer().querySelector(`#${page.selectDate}`);
      select.classList.remove('invisible');
      accept.classList.remove('invisible');
      decline.classList.remove('invisible');
      page.getContainer().querySelector('.select-date').classList.add('invisible');
      alert(`Собеседование назначено на ${form.day < 10 ? '0' + form.day : form.day}/${form.month < 10 ? '0' + form.month : form.month}/${form.year}`, 'success')
    } catch (e) {
      console.log(e)
      alert('Невозможно назначить дату собеседования')
    }
  });

const declineEvent = page => async () => {
  try {
    await requestManager.tryResponseSummary(page.props.info.summaryId, {
      vacancyId: page.props.info.vacancyId,
      accepted: false,
      denied: true,
    });

    page.getContainer().classList.add('removing');
    setTimeout(() => {
      page.getContainer().remove();
      page.reset();
    }, 300);
    page.props.remove();
    alert('Отклик успешно отклонен', 'success');
  } catch(e) {
    console.log(e);
    alert('Ошибка при отклонении. Повторите позднее.')
  }
};
const submitEvent = page => async () => {
  try {
    await requestManager.tryResponseSummary(page.props.info.summaryId, {
      vacancyId: page.props.info.vacancyId,
      accepted: true,
      denied: false,
    });

    page.getContainer().classList.add('removing');
    setTimeout(() => {
      page.getContainer().remove();
      page.reset();
    }, 300);
    page.props.remove();
    alert('Резюме одобрено', 'success');
  } catch(e) {
    console.log(e);
    alert('Ошибка при одобрении. Повторите позднее.')
  }
}
export {
  Item,
};