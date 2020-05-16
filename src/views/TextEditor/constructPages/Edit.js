import {withChainedPages} from '../../../ulils';
import {Navigator} from '../../../Navigator';
import {moveDownEvent, moveUpEvent} from './events';

export const edit = (Wrapee, subRoutes, props) => {
  Wrapee = props.withLocalStore(Wrapee);
  Wrapee = withChainedPages(Wrapee, subRoutes, null, props.ROOT + 'editMode/');
  Wrapee = withEditInit(Wrapee, props);
  const wrapee = new Wrapee(props.CURRENT_MODE_SELECTOR);
  wrapee.props.editorProps = props;
  wrapee.props.Item = props.Item;
  return wrapee;
};

const withEditInit = (Wrapee, props) => {
  return class extends Wrapee {
    #routes;

    constructor(props) {
      super(props);
      this.#routes = [];
    }

    componentDidMount() {
      super.componentDidMount();
      const info = props.EXTRACT_REDUCER(this.props.getStore()).raw;
      if (!info) {
        return;
      }
      Navigator.addRoutes(props.constructEditRoutes(info.map(
          (r) => {
            const item = new (this.props.Item)(`#${r.id}`);
            item.props.info = r;
            return {
              path: r.id,
              alwaysOn: true,
              element: item,
            };
          },
      )));
      Navigator.updateAllPages();
      info.forEach((r) => {
        const el = document.getElementById(r.id);
        el && addEvents(this, el.parentNode, r.id, props);
      });
    }
  };
};

const addEvents = (page, elem, id, props) => {
  const remove = elem.getElementsByClassName('remove-button')[0];
  const moveDown = elem.getElementsByClassName('move-down')[0];
  const moveUp = elem.getElementsByClassName('move-up')[0];

  addRemoveEvent(page, remove, id, elem, props);
  moveDownEvent(page, moveDown, id, 'info', props);
  moveUpEvent(page, moveUp, id, 'info', props);
};


const addRemoveEvent = (page, elem, id, elemToRemove, props) => {
  const removeEvent = () => {
    elem?.removeEventListener('click', removeEvent);
    elemToRemove.classList.add('removing');
    elemToRemove.classList.add('removing-totally');
    if (!elemToRemove?.lastElementChild?.firstChild?.innerHTML) {
      elemToRemove.classList.add('removing-empty');
    }
    setTimeout(() => elemToRemove.remove(), 500);
    page.props.setStore((s) => {
      const subStore = props.EXTRACT_REDUCER(s);
      subStore.raw = subStore.raw.filter((r) => r.id !== id);
      return props.REPLACE_REDUCER(s, subStore);
    });

    Navigator.removeRoutes(props.constructEditRoutes([{
      path: id,
    }]));
  };

  elem?.addEventListener('click', removeEvent);
};
