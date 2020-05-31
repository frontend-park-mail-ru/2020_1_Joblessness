import {Page} from '../../../Page';
import template from './index.pug'
import './style.sass'
import {requestManager, uuid, withForm} from '../../../ulils';
import {isDay, isMonthId} from '../../../ulils/validators';
class SelectDate extends Page {
  render() {
    return template(this.props)
  }
  componentDidMount() {
    super.componentDidMount();
    document.querySelector('#select_date_hide')?.addEventListener('click', (e) => {
      const el = document.querySelector('#select_date');
      el?.classList.remove('placing');
      el?.classList.add('hidden');
      el?.classList.add('removing');
    })
  }
}

SelectDate = withForm(SelectDate, {
  day: {
    id: uuid(),
    validator: isDay,
    warnMessage: 'DD',
    required: true,
  },
  month: {
    id: uuid(),
    validator: (m) => isMonthId(Number(m) - 1),
    warnMessage: 'MM',
    required: true,
  },
  year: {
    id: uuid(),
    validator: n=>  new Date().getFullYear() <= parseInt(n) && parseInt(n) <= new Date().getFullYear() + 1,
    warnMessage: 'YYYY',
    required: true,
  },
},
  {
    id: uuid(),
  },
  (form, page, e, id) => {
    const date = new Date(form.year, Number(form.month) - 1, form.day);
    const el = document.querySelector('#select_date');
    const summaryId = el.getAttribute('summary');
    const vacancyId = el.getAttribute('vacancy');
    requestManager.tryResponseSummary(summaryId, {
      interview_date: date.toJSON(),
      vacancyId : Number(vacancyId)
    }).then(() => {
      const el = document.querySelector('#select_date');
      el?.classList.add('hidden');
      el?.classList.add('removing');
      el?.classList.remove('placing');
    })
      .catch((e) => {
        alert('Не удалось назначить дату собеседования. Повторите позднее');
        console.log(e)
      })
  })
const Routes = [
  {
    path: 'selectDate',
    element: new SelectDate('#select_date'),
    alwaysOn: true,
  }
];

export default Routes