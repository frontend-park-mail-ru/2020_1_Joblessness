export const item = (Wrapee, props) => {
  Wrapee = props.withLocalStore(Wrapee);
  Wrapee = withEditAndLoad(Wrapee, props); 5;
  return Wrapee;
};

const withEditAndLoad = (Wrapee, props) => {
  return class extends Wrapee {
    componentDidMount() {
      super.componentDidMount();
      const parent = document.querySelector(this.container);
      const el = parent.firstChild;
      if (!this._prevLen || this._prevLen >= props.EXTRACT_REDUCER(this.props.getStore()).raw.length) {
        const e = parent.parentNode;
        e?.classList.add('placing-start');
        setTimeout(
            () => {
            e?.classList.add('placing');
            setTimeout(() => {
              e?.classList.remove('placing-start');
              e?.classList.remove('placing');
            }, 500);
            }, 0,
        );

        this._prevLen = props.EXTRACT_REDUCER(this.props.getStore()).raw.length;
      }

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
  };
};
