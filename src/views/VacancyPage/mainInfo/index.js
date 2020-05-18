import {Page} from '../../../Page';
import template from './index.pug';
import {ORGANIZATION, PERSON} from '../../../CONSTANTS';
import {uuid} from '../../../ulils';
import withLocalStore from '../localStore';
import './style.sass'
const canEdit = (page) => {
  return /\/create/.test(window.location.pathname) ?
    currentSession.user.role === ORGANIZATION :
    page.props.getStore().organization.id === currentSession.user.id;
};

class Main extends Page {
  #nameId;
  #descriptionId;
  #salaryFromId;
  #salaryToId;

  constructor(props) {
    super(props);
    this.#nameId = uuid();
    this.#descriptionId = uuid();
    this.#salaryFromId = uuid();
    this.#salaryToId = uuid();
  }
  render() {
    return template({
      fields: {
        name: this.#nameId,
        description: this.#descriptionId,
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
        description: this.#descriptionId,
        salaryFrom: this.#salaryFromId,
        salaryTo: this.#salaryToId,
      },
    );
    initEvents(this, {
      name: this.#nameId,
      description: this.#descriptionId,
      salaryFrom: this.#salaryFromId,
      salaryTo: this.#salaryToId,
    },
    );
  }
}
const initValues = (page, fields) => {
  const nameField = document.querySelector(`#${fields.name}`);
  const descriptionField = document.querySelector(`#${fields.description}`);
  const salaryFromField = document.querySelector(`#${fields.salaryFrom}`);
  const salaryToField = document.querySelector(`#${fields.salaryTo}`);

  const {name, description, salaryFrom, salaryTo} = page.props.getStore().mainInfo.preview;
  nameField.value = name || '';
  descriptionField.value = description || '';
  salaryFromField.value = salaryFrom || '';
  salaryToField.value = salaryTo || '';
};
const initEvents = (page, fields) => {
  const nameField = document.querySelector(`#${fields.name}`);
  const descriptionField = document.querySelector(`#${fields.description}`);
  const salaryFromField = document.querySelector(`#${fields.salaryFrom}`);
  const salaryToField = document.querySelector(`#${fields.salaryTo}`);

  updateEvent(page, 'name', nameField,
      raiseWarn((s) => s.length >= 1 && s.length <= 30, '1-30 символов'));
  updateEvent(page, 'description', descriptionField,
      raiseWarn((s) => s.length <= 50, 'До 50 символов'));
  updateEvent(page, 'salaryFrom', salaryFromField,
      raiseWarn((v) => Number(v) > 0, 'Минимальная зарплата'));
  updateEvent(page, 'salaryTo', salaryToField,
      raiseWarn((v) => Number(v) > 0, 'Максимальная зарплата'));
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
