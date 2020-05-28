import {Navigator} from '../../../Navigator';
import {uuid} from '../../../ulils';

export const list = (Wrapee, props) => {
  Wrapee = props.withLocalStore(Wrapee, createReducers(props));
  Wrapee = withItems(Wrapee, props);
  const wrapee = new Wrapee(props.listSelector);
  wrapee.props.loadableList = props;
  return wrapee;
};

const isEqSorted = (a, b) => {
  if(a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if(a[i].id !== b[i].id) {
      return false;
    }
  }
  return true;
};
const withItems = (Wrapee, props) => {
  return class extends Wrapee {

    #currentRoutes;

    constructor(props) {
      super(props);
      this.#currentRoutes = [];
      this.props.items = [];
    }

    componentWillMount() {
      super.componentWillMount();
      if(this.#currentRoutes.length) {
        for(let r of this.#currentRoutes)
        Navigator.removeRoutes(props.createFullRoute(props.listRoute([r])));
      }
    }

    componentDidMount() {
      super.componentDidMount();
      const newRoutes = this.props.items
        .map(i => ({
            path: i.innerId,
            alwaysOn: true,
            element: updateItem(new props.ListItem(`#${i.innerId}`), i, props),
          })
        );
      Navigator.addRoutes(props.createFullRoute(props.listRoute(newRoutes)));
      this.#currentRoutes = [...newRoutes];
      Navigator.updateAllPages();
    }
  }
};

const updateItem = (item, info, props) => {
  item.props.info = info;
  item.props.remove = () => {
    Navigator.removeRoutes(props.createFullRoute(props.listRoute([info.innerId])))
  };
  return item;
}

const createReducers = (props) => {
  return   {
    [props.reducerKey]: (page, oldState, newState) => {
      const oldList = props.extractFromStore(oldState);
      const newList = props.extractFromStore(newState);
      if (!isEqSorted(oldList, newList) || oldList.length !== page.props.items.length) {
        page.props.items = newList.map(i => ({...i,innerId: uuid()}));
        page.needUpdate();
        Navigator.updateAllPages();
      }
    }
  }
};