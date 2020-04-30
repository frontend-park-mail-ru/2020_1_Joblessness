import {Page} from '../../../Page';
import template from './index.pug';
import './style.sass';
import {withLocalStore} from '../withLocalStore';
class Display extends Page {
  #oldEv;
  #inProgress;
  render() {
    return template(this.props.getStore().search);
  }
  // componentDidMount() {
  //   super.componentDidMount();
  //   if(this.#oldEv)
  //     return;
  //   document.querySelector('#search_upper_items').style.height = '0px';
  //   document.querySelector('#search_lower_items').style.height = '0px';
  //   this.#oldEv = (e) => {
  //     if(this.#inProgress)
  //       return;
  //     this.#inProgress = true;
  //     // if(oldS !== window.scrollY)
  //     //   oldS = window.scrollY;
  //     // else
  //     //   return;
  //     const container= document.querySelector(this.container);
  //     if(!container) {
  //       // window.removeEventListener('scroll', this.#oldEv);
  //       window.onscroll = null;
  //       this.#oldEv = null;
  //     }
  //
  //     const children = Array.from(container.childNodes[0].childNodes);
  //     const up = children[0];
  //     const bottom = children[children.length - 1];
  //     let upHeight = 0, botHeight = 0;
  //     for(let i = 1; i < 2; i++) {
  //       const c = children[i];
  //       const {top, bottom, height} = c.getBoundingClientRect();
  //       const ctop = c.offsetTop;
  //       const cheight = c.clientHeight;
  //       const cbottom = top + height;
  //       console.log(ctop, cbottom, -height - 10, window.innerHeight + height + 10)
  //       console.log(bottom < -height - 10, bottom === 0)
  //       if(bottom < -height - 10 && bottom !== 0) {
  //         if(c.getAttribute('dir') === 'none' || !c.getAttribute('dir')) {
  //           upHeight += c.getBoundingClientRect().height;
  //           c.setAttribute('dir', 'up');
  //           c.style.display = 'none';
  //         }
  //       } else if(top > window.innerHeight + height + 10 && top !== 0) {
  //         if(c.getAttribute('dir') === 'none' || !c.getAttribute('dir')) {
  //           botHeight += c.getBoundingClientRect().height;
  //           c.setAttribute('dir', 'bot');
  //           c.style.display = 'none';
  //         }
  //       } else {
  //             if(c.getAttribute('dir') === 'up') {
  //               c.setAttribute('dir', 'none');
  //               c.style.display = '';
  //               upHeight -= c.getBoundingClientRect().height;
  //             } else if(c.getAttribute('dir') === 'bot') {
  //               c.setAttribute('dir', 'none');
  //               c.style.display = '';
  //               botHeight -= c.getBoundingClientRect().height;
  //             }
  //       }
  //     }
  //     const upH = up.getBoundingClientRect().height;
  //     const botH = bottom.getBoundingClientRect().height;
  //     if(upHeight)
  //       up.style.height = `${upH + upHeight}px`;
  //     if(botHeight)
  //     bottom.style.height = `${botH + botHeight}px`;
  //     setTimeout(() => this.#inProgress = false, 100)
  //   };
  //   // window.addEventListener('scroll', this.#oldEv);
  //   window.onscroll = this.#oldEv;
  // }
  //
}

Display = withLocalStore(Display);
export {
  Display,
};
