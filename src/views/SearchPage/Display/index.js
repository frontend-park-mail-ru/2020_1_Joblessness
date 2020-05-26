import {Page} from '../../../Page';
import template from './index.pug';
import './style.sass';
import {withLocalStore} from '../withLocalStore';

class Display extends Page {
  #oldSearch
  #toShow
  render() {
    return template(this.#toShow);
  }

  componentWillUpdate() {
    super.componentWillUpdate();
    const search = this.props.getStore().search;
    if(this.#oldSearch === search)
      return;
    this.#oldSearch = search;
    let result = [];
    let i = 0;// current page
    let p = 10;// page size
    let index = 0;
    while (true) {
      const orgs = search.organizations;
      const vacs = search.vacancies;
      const users = search.persons;

      const page = {
        organizations: [],
        persons: [],
        vacancies: [],
      };


      const minI = Math.min(orgs.length, vacs.length, users.length);
      for (let ind = i * p; ind < minI; ind++) {
        page.organizations.push(orgs[ind]);
        page.vacancies.push(vacs[ind]);
        page.persons.push(users[ind]);
      }

      const startInd = minI < i * p ? i * p : minI;

      if (minI < orgs.length) {
        const endInd = orgs.length > i * p + p ? p + i * p : orgs.length;
        for (let ind = startInd; ind < endInd; ind++)
          page.organizations.push(orgs[ind]);
      }
      if (minI < vacs.length) {
        const endInd = vacs.length > i * p + p ? p + i * p : vacs.length;
        for (let ind = startInd; ind < endInd; ind++)
          page.vacancies.push(vacs[ind]);
      }
      if (minI < users.length) {
        const endInd = users.length >= i * p + p ? p + i * p : users.length;
        for (let ind = startInd; ind < endInd; ind++)
          page.persons.push(users[ind]);
      }
      if (!page.persons.length && !page.vacancies.length && !page.organizations.length)
        break;
      result.push(page);
      i++;
    }
    this.#toShow = result;
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
