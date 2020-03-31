import {Page} from '../../../../Page';
import template from './index.pug'
import './style.sass'
import {withChainedPages} from '../../../../ulils';
import {SubRoutes, RootPath, constructSubRoutes} from './subRoutes';
import {Navigator} from '../../../../Navigator';
import withLocalStore from '../localStore';
import {ParagraphItem} from './ParagraphItem';
import {moveDownEvent, moveUpEvent} from './events'

class EditInfo extends Page {

  #routes;

  constructor(props) {
    super(props);
    this.#routes = [];
  }

  render() {
    return template({info: this.props.getStore().raw});
  }

  componentDidMount() {
    super.componentDidMount();

    const info = this.props.getStore().raw;

    if(!info)
      return;
    Navigator.addRoutes(constructSubRoutes(info.map(
      r => {
        const item = new ParagraphItem(`#${r.id}`);
        item.props.info = r;
        return {
        path: r.id,
        alwaysOn: true,
        element: item,
      }}
    )));
    Navigator.updateAllPages();
    info.forEach( (r) => {
      const el = document.getElementById(r.id);
      el && addEvents(this, el.parentNode, r.id);
    })
  }
}

const addEvents = (page, elem, id) => {
  const remove = elem.getElementsByClassName('remove-button')[0];
  const moveDown = elem.getElementsByClassName('move-down')[0];
  const moveUp = elem.getElementsByClassName('move-up')[0];

  addRemoveEvent(page, remove, id, elem);
  moveDownEvent(page, moveDown, id, 'info', 'raw');
  moveUpEvent(page, moveUp, id, 'info', 'raw');
};


const addRemoveEvent = (page, elem, id, elemToRemove) => {
  const removeEvent = () => {
    elem?.removeEventListener('click', removeEvent);
    elemToRemove.classList.add('removing');

    setTimeout(() => elemToRemove.remove(), 500);

    page.props.setStore(s => ({
      raw: s.raw.filter(r => r.id !== id)
    }));

    Navigator.removeRoutes(constructSubRoutes([{
      path: id,
    }]));

  };

  elem?.addEventListener('click', removeEvent);
};

EditInfo = withLocalStore(EditInfo);
EditInfo = withChainedPages(EditInfo, SubRoutes, null, RootPath);

export {
  EditInfo
}