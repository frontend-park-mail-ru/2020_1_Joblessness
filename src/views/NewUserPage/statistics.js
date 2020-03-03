import './style.sass'
import {Page} from '../../Page';
import template from './pug/sub/statistics.pug'

class StatisticsSubPage extends Page {

  render() {
    return template(this.props);
  }
}

export {StatisticsSubPage};
