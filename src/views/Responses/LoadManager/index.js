import {Page} from '../../../Page';
import './style.sass';
import template from './index.pug';
import {requestManager, uuid} from '../../../ulils';
import withLocalStore from '../localStore';

class LoadManager extends Page {
  render() {
    return '';
  }

  componentDidMount() {
    super.componentDidMount();
    requestManager
      .tryGetOrgResponses(currentSession.user.id)
      .then(async (r) => {
        const list = await r.json();
        console.log(list)
        list.forEach((i) => i.innerId = uuid());
        this.props.setStore((s) => ({
          responses: list.map((i) => ({...i})),
        }));
      })
      .catch((r) => {
        alert('Невозможно загрузить список откликов');
        console.log(r)
      });
  }
}

LoadManager = withLocalStore(LoadManager, {
  updateLoadManager: (page, oldS, newS) => {
    if (oldS.currentPage !== newS.currentPage &&
      newS.currentPage === 'responses') {
      page.props.random = uuid();
    }
  }
});
export {
  LoadManager,
};
