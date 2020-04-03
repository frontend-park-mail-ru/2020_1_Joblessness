import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {appendForm} from './appendForm';

/**
 * summary creation forms
 */
class CreateSummaryPage extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return template(this.props.inputFields);
  }
}

CreateSummaryPage = appendForm(CreateSummaryPage);
export {
  CreateSummaryPage,
};
