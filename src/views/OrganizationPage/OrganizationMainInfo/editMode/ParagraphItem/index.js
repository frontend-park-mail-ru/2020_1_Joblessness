import {Page} from '../../../../../Page';
import './style.sass'
import template from './index.pug'
import withLocalStore from '../../localStore';

class ParagraphItem extends Page {

  render() {
    return template({
      info: this.props.getStore().raw.filter(r => r.id === this.props.info.id)[0]
    });
  }

  componentDidMount() {
    super.componentDidMount();
    const parent = document.querySelector(this.container);
    const el = parent.firstChild;
    console.log(this._prevLen, this.props.getStore().raw.length);
    if (!this._prevLen || this._prevLen >= this.props.getStore().raw.length) {
      const e = parent.parentNode;
      e?.classList.add('placing-start');
      setTimeout(
        () => {
          e?.classList.add('placing');
          setTimeout(() => {
            e?.classList.remove('placing-start');
            e?.classList.remove('placing');
          }, 500)
        }, 0,
      );

      this._prevLen = this.props.getStore().raw.length;
    }

    el.addEventListener('input', (e) => {
      const text = e.target.innerHTML;
      this.props.setStore(s => ({
        raw: s.raw.map(r => {
          if (r.id !== this.props.info.id)
            return r;
          return {
            ...r,
            text,
          }
        })
      }));
    })
  }


}

ParagraphItem = withLocalStore(ParagraphItem);
export {
  ParagraphItem
}