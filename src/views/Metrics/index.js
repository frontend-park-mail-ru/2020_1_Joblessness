import {Page} from '../../Page';
import request from '../../ulils/request';
import {Navigator} from '../../Navigator';

class MetricsPage extends Page {

  constructor(props) {
    super(props);
    this.props.metrics = '';
  }

  render() {
    return `${this.props.metrics}`
  }

  componentDidMount() {
    super.componentDidMount();
    if(!this._was) {
      this._was = true;
      request.get(`/api/metrics`).then(
        async (r) => {
          try {
            const text = await r.text();
            console.log(text)
            this.props.metrics = text;
            Navigator.updateAllPages();
          } catch (e) {
            console.log(e);
            alert('не удалось получить информацию о метриках')
          }
        }
      )
    }

  }
}

const Routes = [
  {
    path: 'metrics',
    element: new MetricsPage('#root')
  }
];

export default Routes