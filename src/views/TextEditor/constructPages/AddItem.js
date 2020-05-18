import {uuid} from '../../../ulils';

export const addItem = (Wrapee, props) => {
  Wrapee = props.withLocalStore(Wrapee);
  Wrapee = withAdd(Wrapee, props);
  const wrapee = new Wrapee(props.ADD_PARAGRAPH_SELECTOR);
  wrapee.props.editorProps = props;
  return wrapee;
};

const withAdd = (Wrapee, props) => {
  return class extends Wrapee {
    componentDidMount() {
      super.componentDidMount();
      const parent = document.querySelector(this.container);
      if (parent) {
        parent.classList.add('placing-start');
        setTimeout(() => {
          parent.classList.remove('placing-start');
          parent.classList.add('placing-o');
          setTimeout(() => {
            parent.classList.remove('placing-o');
          }, 500);
        }, 1);
        const addButton = parent.querySelector('.start-adding');
        addButton.addEventListener('click', () => {
          if (props.CUSTOM_LISTENERS) {
            const newItem = props.CUSTOM_LISTENERS.initItem(this, props);
            if(!props.MAX_SIZE || props.EXTRACT_REDUCER(this.props.getStore()).raw.length < props.MAX_SIZE) {
              this.props.setStore(props.INSERT_REDUCER(newItem));
              this.props.requestNextNoUpdate(newItem);
            } else {
              props.ON_ITEM_LIMIT?.()
            }
          } else {
            const newItem = {
              id: uuid(),
              classList: ['paragraph'],
              text: '',
            };
            if(!props.MAX_SIZE || props.EXTRACT_REDUCER(this.props.getStore()).raw.length < props.MAX_SIZE) {
              this.props.setStore(props.INSERT_REDUCER(newItem));
              this.props.requestNextNoUpdate(newItem);
            } else {
              props.ON_ITEM_LIMIT?.()
            }
          }
        });
      }
    }
  };
};
