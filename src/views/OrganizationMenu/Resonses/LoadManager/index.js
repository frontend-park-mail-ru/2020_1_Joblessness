import {Page} from '../../../../Page';
import './style.sass';
import template from './index.pug';
import {requestManager, uuid} from '../../../../ulils';
import withLocalStore from '../../localStore';
import {Navigator} from '../../../../Navigator';
import {constructRoute} from '../../routes';
import {AddItemRoutes} from '../../Container/routes';
import {Item} from '../Item';

class LoadManager extends Page {
  render() {
    return '';
  }

  componentDidMount() {
    super.componentDidMount();
    requestManager
        .tryGetOrgResponses(currentSession.user.id)
        .then(async (r) => {
          console.log(r)
          const list = await r.json();
          list.forEach((i) => i.innerId = uuid());
          this.props.setStore((s) =>({
            responses: list.map((i) => ({...i})),
          }));
          Navigator.addRoutes(
              constructRoute(
                  AddItemRoutes(
                      list.map( (i) => {
                        const element = new Item(`#${i.innerId}`);
                        element.props.item = i;
                        return {
                          path: i.innerId,
                          element,
                          alwaysOn: true,
                        };
                      }),
                  ),
              ),
          );
          Navigator.updateAllPages();
        })
        .catch((r) => {
          this.props.reloadStore();
          Navigator.addRoutes(
              constructRoute(
                  AddItemRoutes(
                      this.props.getStore().responses.map( (i) => ({
                        path: i.innerId,
                        element: new Item(`#${i.innerId}`),
                        alwaysOn: true,
                      })),
                  ),
              ),
          );
          Navigator.updateAllPages();
        });
  }
}

LoadManager = withLocalStore(LoadManager,{
  updateLoadManager: (page, oldS, newS) => {
    if(oldS.currentPage !== newS.currentPage &&
      newS.currentPage === 'responses') {
      page.props.random = uuid();
    }
  }
});
export {
  LoadManager,
};
