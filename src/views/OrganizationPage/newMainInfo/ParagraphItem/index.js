import {Page} from '../../../../Page';
import './style.sass'
import template from './index.pug'

class ParagraphItem extends Page {

  render() {
    return template({
      info: this.props.getStore().mainInfo.raw.filter(r => r.id === this.props.info.id)[0]
    });
  }

  // componentDidMount() {
  //   super.componentDidMount();
  //   const parent = document.querySelector(this.container);
  //   const el = parent.firstChild;
  //   if (!this._prevLen || this._prevLen >= this.props.getStore().mainInfo.raw.length) {
  //     const e = parent.parentNode;
  //     e?.classList.add('placing-start');
  //     setTimeout(
  //       () => {
  //         e?.classList.add('placing');
  //         setTimeout(() => {
  //           e?.classList.remove('placing-start');
  //           e?.classList.remove('placing');
  //         }, 500)
  //       }, 0,
  //     );
  //
  //     this._prevLen = this.props.getStore().mainInfo.raw.length;
  //   }
  //
  //   el.addEventListener('input', (e) => {
  //     const text = e.target.innerHTML;
  //     this.props.setStore(s => ({
  //       mainInfo: {
  //         ...s.mainInfo,
  //         raw: s.mainInfo.raw.map(r => {
  //           if (r.id !== this.props.info.id)
  //             return r;
  //           return {
  //             ...r,
  //             text,
  //           }
  //         })
  //       }
  //     }));
  //   })
  // }


}

export {
  ParagraphItem
}