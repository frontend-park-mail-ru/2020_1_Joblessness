export const item = (Wrapee, props) => {
  Wrapee = props.withLocalStore(Wrapee);
  Wrapee = withEditAndLoad(Wrapee, props); 5;
  return Wrapee;
};

const withEditAndLoad = (Wrapee, props) => {
  return class extends Wrapee {
    #mounted = false
    componentWillUpdate() {
      super.componentWillUpdate();
      if(!this.#mounted) {
        this.#mounted = true;
        props.CUSTOM_LISTENERS && props.CUSTOM_LISTENERS.init(this, props);
      }
    }
    componentDidMount() {
      super.componentDidMount();
      const parent = this.getContainer();
      const el = parent.firstChild;
      if (!this._prevLen || this._prevLen >= props.EXTRACT_REDUCER(this.props.getStore()).raw.length) {
        const e = parent.parentNode;
        e?.classList.add('placing-start');
        e?.classList.add('placing-start-state');
        setTimeout(
            () => {
            e?.classList.add('placing');
            e?.classList.remove('placing-start-state');
            setTimeout(() => {
              e?.classList.remove('placing-start');
              e?.classList.remove('placing');
            }, 500);
            }, 0,
        );

        this._prevLen = props.EXTRACT_REDUCER(this.props.getStore()).raw.length;
      }
      if (props.CUSTOM_LISTENERS) {
        props.CUSTOM_LISTENERS.set(this, props);
      } else {
        el.addEventListener('input', (e) => {
          const text = e.target.innerHTML;
          this.props.setStore((s) => {
            const subStore = props.EXTRACT_REDUCER(this.props.getStore());
            subStore.raw = subStore.raw.map((r) => {
              if (r.id !== this.props.info.id) {
                return r;
              }
              return {
                ...r,
                text,
              };
            });
            return props.REPLACE_REDUCER(s, subStore);
          });
        });
      }
    }
  };
};
