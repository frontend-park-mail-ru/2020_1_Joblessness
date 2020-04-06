import {Page} from './Page';

/**
 * To append Header as subpage
 */
class RootElement extends Page {
  /**
   * @return {string}
   */
  render() {
    return `<div id="nav-elements"></div><div id="root"></div><div class='responses-holder' id="responses-page"></div>`;
  }
}

export {
  RootElement,
};
