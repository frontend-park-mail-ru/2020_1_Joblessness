import {Page} from '../../../../Page';
import './style.sass';
import template from './index.pug';
import {requestManager, uuid} from '../../../../ulils';
import {Navigator} from '../../../../Navigator';
import {constructRoute} from '../../routes';
import {AddItemRoutes} from '../../Container/routes';
import {openDialog} from '../../Messenger';

class Item extends Page {
  #accept;
  #decline;
  #selectDate;
  constructor(props) {
    super(props);
    this.#accept = uuid();
    this.#decline = uuid();
    this.#selectDate = uuid();
  }

  render() {
    return template({
      ...this.props,
      acceptId: this.#accept,
      declineId: this.#decline,
      selectDateId: this.#selectDate
    });
  }

  componentDidMount() {
    super.componentDidMount();
    acceptEvent(this, this.#accept);
    declineEvent(this, this.#decline);
    selectDateEvent(this, this.#selectDate);
  }
}

export {
  Item,
};

const selectDateEvent = (page, id) => {
  document.querySelector(`#${id}`).addEventListener('click',
    () => {
    const el = document.querySelector('#select_date');
      el?.classList.remove('hidden');
      el?.classList.remove('removing');
      el?.classList.add('placing');
      el?.setAttribute('summary', page.props.item.summaryId);
      el?.setAttribute('vacancy', page.props.item.vacancyId);
    }
  )
};
const acceptEvent = (page, id) => {
  document.querySelector(`#${id}`).addEventListener('click',
    () => {
      requestManager.tryResponseSummary(page.props.item.summaryId, {
        vacancyId: page.props.item.vacancyId,
        accepted: true,
        denied: false,
      }).then(
        () => {
          alert('Резюме одобрено');
          document.querySelector(page.container).remove();
          Navigator.removeRoutes(
            constructRoute(
              AddItemRoutes([{
                path: page.props.item.innerId,
              }]),
            ),
          )
        },
      ).catch(() => alert('Ошибка при одобрении. Повторите позднее.'));
    });
};

const declineEvent = (page, id) => {
  document.querySelector(`#${id}`).addEventListener('click',
    () => {
      requestManager.tryResponseSummary(page.props.item.summaryId, {
        vacancyId: page.props.item.vacancyId,
        accepted: false,
        denied: true,
      }).then(
        () => {
          document.querySelector(page.container).remove();
          Navigator.removeRoutes(
            constructRoute(
              AddItemRoutes([{
                path: page.props.item.innerId,
              }]),
            ),
          )
        },
      ).catch((e) => {
        console.log(e);
        alert('Ошибка при отклонении. Повторите позднее.')
      });
    });
};