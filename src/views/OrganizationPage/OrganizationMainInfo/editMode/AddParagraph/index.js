import {Page} from '../../../../../Page';
import './style.sass'
import template from './index.pug'
import {uuid} from '../../../../../ulils';
import withLocalStore from '../../localStore';

class AddParagraph extends Page {

  render() {
    return template(this.props);
  }

  componentDidMount() {
    super.componentDidMount();
    const parent = document.querySelector(this.container);
    const addButton = parent.querySelector('.start-adding');
    addButton.addEventListener('click', () => {
      const newItem = {
        id: uuid(),
        classList: ['paragraph'],
        text: '',
      };

      this.props.setStore(
        (s) => ({
          raw: [
            ...s.raw,
            newItem,
          ],
        }),
      );

      this.props.requestNextNoUpdate(newItem);
    })
  }
}

AddParagraph = withLocalStore(AddParagraph);
export {
  AddParagraph
}