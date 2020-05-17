import {Page} from '../../../../Page';
import './style.sass';
import template from './index.pug';
import {requestManager, uuid} from '../../../../ulils';
import {Navigator} from '../../../../Navigator';
import {constructRoute} from '../../routes';
import {AddItemRoutes} from '../../Container/routes';

class Item extends Page {
  #accept;
  #decline;
  #sendMessage;
  constructor(props) {
    super(props);
    this.#accept = uuid();
    this.#decline = uuid();
    this.#sendMessage = uuid();
  }

  render() {
    return template({
      ...this.props,
      acceptId: this.#accept,
      declineId: this.#decline,
      sendMessageId: this.#sendMessage
    });
  }

  componentDidMount() {
    super.componentDidMount();
    acceptEvent(this, this.#accept);
    declineEvent(this, this.#decline);
    sendMessageEvent(this, this.#sendMessage)
  }
}
const sendMessageEvent = (page, id) => {
  document.querySelector(`#${id}`).addEventListener('click',
    () => {
      console.log(1)
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
export {
  Item,
};
