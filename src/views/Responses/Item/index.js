import {Page} from '../../../Page';
import './style.sass'
import template from './index.pug'
import {requestManager, uuid} from '../../../ulils';

class Item extends Page {
  #accept;
  #decline;
  constructor(props) {
    super(props);
    this.#accept = uuid();
    this.#decline = uuid();
  }
  render() {
    return template({
      ...this.props,
      acceptId: this.#accept,
      declineId: this.#decline,
    });

  }
  componentDidMount() {
    super.componentDidMount();
    acceptEvent(this, this.#accept);
    declineEvent(this, this.#decline);
  }
}

const acceptEvent = (page, id) => {
  document.querySelector(`#${id}`).addEventListener('click',
    () => {
    requestManager.tryResponseSummary(page.props.item.summaryId, {
      vacancyId: page.props.item.vacancyId,
      accepted: true,
      denied: false,
    }).then(
      () => alert('Резюме одобрено')
    ).catch(() => alert('Ошибка при одобрении. Повторите позднее.'))
    })
}

const declineEvent = (page, id) => {
  document.querySelector(`#${id}`).addEventListener('click',
    () => {
      requestManager.tryResponseSummary(page.props.item.summaryId, {
        vacancyId: page.props.item.vacancyId,
        accepted: false,
        denied: true,
      }).then(
        () => {
          alert('Резюме отклонено')
        }
      ).catch(() => alert('Ошибка при отклонении. Повторите позднее.'))
    })
}
export {
  Item
}