import {getDocHeight} from '../../SearchPage/Bar';
import {Navigator} from '../../../Navigator';

export const loadManager = (Wrapee, props) => {
  Wrapee = withLoad(Wrapee, props);
  Wrapee = props.withLocalStore(Wrapee);
  if (props.enablePagination)
    Wrapee = withLoadOnScroll(Wrapee, props);
  const wrapee = new Wrapee(props.LoadManagerSelector);
  wrapee.props.loadableList = props;
  return wrapee;
};

const withLoad = (Wrapee, props) => {

  return class extends Wrapee {
    componentWillUpdate() {
      super.componentWillUpdate();
      if (!this._isLoading) {
        this._isLoading = true;
        loadItems(this, props);
      }
    }
    // componentWillMount() {
    //   super.componentWillMount();
    //   if (!this._isLoading) {
    //     this._isLoading = true;
    //     loadItems(this, props);
    //   }
    // }
  }
};

const loadItems = async (page, props) => {
  const res = await props.load();
  if (res) {
    page.props.setStore(
      props.insertIntoStore(res)
    );
  }
  page._isLoading = false;
};


const withLoadOnScroll = (Wrapee, props) => {
  return class extends Wrapee {
    #pageNumber;
    #lastEv;
    #lastLen;
    #inProgress;

    constructor(p) {
      super(p);
      this.#pageNumber = 1;
      this.#lastLen = 0;
      this.#lastEv = null;
    }

    componentWillMount() {
      super.componentDidMount();
      if (this.#lastEv) {
        window.removeEventListener('scroll', this.#lastEv);
        this.#lastEv = null
      }

      const ev = async () => {

        if (this.#inProgress) {
          return;
        }

        if (!this.getContainer()) {
          window.removeEventListener('scroll', ev);
          return;
        }

        if (window.scrollY + window.innerHeight >= getDocHeight()) {
          this.#inProgress = true;
          try {
            const items = await props.load(this.#pageNumber++);
            const startLen = items.length;
            if (items.length > this.#lastLen) {
              const toInsert = [];
              for(let i = this.#lastLen; i < items.length; i++)
                toInsert.push(items[i]);
              if(toInsert.length)
                this.props.setStore(props.pushIntoStore(toInsert))
            } else {
              if (items.length !== props.pagSize && this.#lastLen !== props.pagSize) {
                return;
              }
              this.props.setStore(props.pushIntoStore(items));
            }
            this.#lastLen = startLen;
            this.#inProgress = false;
          } catch (e) {
            this.#pageNumber--;
            this.#inProgress = false;
          }
        }
      };
      window.addEventListener('scroll', ev);
      this.#lastEv = ev;
    }
  }
};