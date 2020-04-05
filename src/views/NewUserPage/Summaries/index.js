import {Page} from '../../../Page';
import template from './index.pug'
import withLocalStore from '../localStore';

class SummariesSubPage extends Page {

  render() {
    return template(this.props);
  }

}

SummariesSubPage = withLocalStore(SummariesSubPage);

export {
  SummariesSubPage
}