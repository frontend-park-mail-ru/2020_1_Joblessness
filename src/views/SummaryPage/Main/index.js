import {Page} from '../../../Page';
import template from './index.pug';
import {PERSON} from '../../../CONSTANTS';
import {uuid} from '../../../ulils';
import withLocalStore from '../localStore';

const canEdit = (page) => {
  return /\/create/.test(window.location.pathname) ?
    currentSession.user.role === PERSON :
    page.props.getStore().user.id === currentSession.user.id;
};

class Main extends Page {
  #nameId;
  #salaryFromId;
  #salaryToId;

  constructor(props) {
    super(props);
    this.#nameId = uuid();
    this.#salaryFromId = uuid();
    this.#salaryToId = uuid();
  }
  render() {
    return template({
      fields: {
        name: this.#nameId,
        salaryFrom: this.#salaryFromId,
        salaryTo: this.#salaryToId,
      },
      canEdit: canEdit(this),
    });
  }

  componentDidMount() {
    super.componentDidMount();

    initValues(this, {
        name: this.#nameId,
        salaryFrom: this.#salaryFromId,
        salaryTo: this.#salaryToId,
      },
    );
    initEvents(this, {
      name: this.#nameId,
      salaryFrom: this.#salaryFromId,
      salaryTo: this.#salaryToId,
    },
    );
  }
}
const initValues = (page, fields) => {
  const nameField = document.querySelector(`#${fields.name}`);
  const salaryFromField = document.querySelector(`#${fields.salaryFrom}`);
  const salaryToField = document.querySelector(`#${fields.salaryTo}`);

  const {name, salaryFrom, salaryTo} = page.props.getStore().mainInfo.preview;
  nameField.value = name || '';
  salaryFromField.value = salaryFrom || '';
  salaryToField.value = salaryTo || '';
};
const initEvents = (page, fields) => {
  const nameField = document.querySelector(`#${fields.name}`);
  const salaryFromField = document.querySelector(`#${fields.salaryFrom}`);
  const salaryToField = document.querySelector(`#${fields.salaryTo}`);

  updateEvent(page, 'name', nameField,
      raiseWarn((s) => s.length >= 1 && s.length <= 25, '1-25 символов'));
  updateEvent(page, 'salaryFrom', salaryFromField,
      raiseWarn((v) => Number(v) > 0, 'Положительное число'));
  updateEvent(page, 'salaryTo', salaryToField,
      raiseWarn((v) => Number(v) > 0, 'Положительное число'));
};

const raiseWarn = (validator, msg) => (v, el) => {
  if (!validator(v)) {
    el.parentNode.lastChild.innerHTML = msg;
  } else {
    el.parentNode.lastChild.innerHTML = '';
  }
  return v;
};
const updateEvent = (page, fieldName, el, convert = (v) => v) => {
  convert(el.value, el);
  const event = (e) => {
    const val = e.target.value;
    page.props.setStore(
        (s) => ({
          mainInfo: {
            ...s.mainInfo,
            preview: {
              ...s.mainInfo.preview,
              [fieldName]: convert(val, el),
            },
          },
        })
    );
  };
  el.addEventListener('input', event);
};

Main = withLocalStore(Main);
export {
  Main,
};
