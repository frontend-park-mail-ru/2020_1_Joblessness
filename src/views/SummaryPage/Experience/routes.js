import {createEditor} from '../../TextEditor';
import {withLocalStore} from '../localStore';

import {Parent} from './Parent';
import {Preview} from './Preview';
import {Edit} from './Edit';
import {AddItem} from './AddItem';
import {ModeManager} from './ModeManager';
import {Item} from './Item';
import {requestManager, uuid} from '../../../ulils';
import {isYear} from '../../../ulils/validators';

export const isCreationPage = () => /\/create/.test(location.pathname);

const Routes = createEditor({
  Parent,
  Preview,
  Edit,
  AddItem,
  Item,
  ModeManager,
  withLocalStore,
}, {
  SUBMIT_REDUCER: (s) => ({
    experience: {
      ...s.experience,
      preview: [...s.experience.raw],
    },
  }),
  DECLINE_REDUCER: (s) => ({
    experience: {
      ...s.experience,
      raw: [...s.experience.preview],
    },
  }),
  EXTRACT_REDUCER: (s) => {
    return s.experience;
  },
  REPLACE_REDUCER: (store, sub) => {
    return {
      experience: {
        ...store.experience,
        ...sub,
      },
    };
  },
  INSERT_REDUCER: (item) => (s) => ({
    experience: {
      ...s.experience,
      raw: [...s.experience.raw, item],
    },
  }),
  MAX_SIZE: 5,
  ROOT: 'experience/',
  EDITOR_HOLDER_SELECTOR: '#summary_experience',
  ROOT_TEMPLATE: (childRoutes = []) => [
    {
      path: 'summaries/*',
      childRoutes,
    },
  ],
  CUSTOM_LISTENERS: {
    initItem: (page, props) => ({
      id: uuid(),
      companyName: '',
      role: '',
      experienceFrom: '',
      experienceTo: '',
      responsibilities: '',
      correct: {
        companyName: false,
        role: false,
        experienceFrom: false,
        experienceTo: false,
        responsibilities: true,
      },
    }),
    init: (page, props) => {
      const fields = {
        companyName: uuid(),
        role: uuid(),
        experienceFrom: uuid(),
        experienceTo: uuid(),
        responsibilities: uuid(),
      };
      page.props.fields = fields;
    },
    set: (page, props) => {
      initValues(page, page.props.fields);
      initEvents(page, page.props.fields);
    },
  },
  ON_ITEM_LIMIT : () => {
    alert('Можно указать не более 5 мест работы')
  },
  onApply: (props, page) => new Promise((resolve, reject) => {
    const exp = page.props.getStore().experience.raw;
    for( let e of exp) {
      const {companyName, role, experienceFrom, experienceTo, responsibilities} = e.correct;
      const isCorrect =  companyName && role && experienceFrom && experienceTo && responsibilities
      if(!isCorrect) {
        alert('Не все поля в опыте работы заполнены верно');
        if(!companyName) alert('Проверьте поле "Название компании"');
        if(!role) alert('Проверьте поле "Должность"');
        if(!experienceFrom) alert('Проверьте поле "работали с"');
        if(!experienceTo) alert('Проверьте поле "работали по"');
        if(!responsibilities) alert('Проверьте поле "Обязанности"');
        reject();
      }
    }
    resolve();
  }),
});


const initValues = (page, fields) => {
  const companyNameField = document.querySelector(`#${fields.companyName}`);
  const roleField = document.querySelector(`#${fields.role}`);
  const experienceFromField = document.querySelector(`#${fields.experienceFrom}`);
  const experienceToField = document.querySelector(`#${fields.experienceTo}`);
  const responsibilitiesField = document.querySelector(`#${fields.responsibilities}`);

  const {companyName, role, experienceFrom,
    experienceTo, responsibilities} = page.props.getStore().experience.raw.find((i) => i.id === page.props.info.id);
  //
  companyNameField.value = companyName || '';
  roleField.value = role || '';
  experienceFromField.value = experienceFrom || '';
  experienceToField.value = experienceTo || '';
  responsibilitiesField.value = responsibilities || '';
};


const initEvents = (page, fields) => {
  const companyNameField = document.querySelector(`#${fields.companyName}`);
  const roleField = document.querySelector(`#${fields.role}`);
  const experienceFromField = document.querySelector(`#${fields.experienceFrom}`);
  const experienceToField = document.querySelector(`#${fields.experienceTo}`);
  const responsibilitiesField = document.querySelector(`#${fields.responsibilities}`);


  updateEvent(page, 'companyName', companyNameField,
      raiseWarn((s) => s.length >= 1 && s.length <= 30, '1-30 символов'), (s) => s.length >= 1 && s.length <= 30);
  updateEvent(page, 'role', roleField,
      raiseWarn((s) => s.length <= 30, 'До 30 символов'), (s) => s.length <= 30);
  updateEvent(page, 'experienceFrom', experienceFromField,
      raiseWarn(isYear, 'YYYY'), isYear);
  updateEvent(page, 'experienceTo', experienceToField,
      raiseWarn(isYear, 'YYYY'), isYear);
  updateEvent(page, 'responsibilities', responsibilitiesField,
      raiseWarn((s) => /^[a-zA-Z0-9а-яА-ЯёЁ_.\-, ]*$/.test(s), 'Ключевые слова через запятую'), (s) => /^[a-zA-Z0-9а-яА-ЯёЁ_, ]*$/.test(s));
};

const raiseWarn = (validator, msg) => (v, el) => {
  if (!validator(v)) {
    el.parentNode.lastChild.innerHTML = msg;
  } else {
    el.parentNode.lastChild.innerHTML = '';
  }
  return v;
};
const updateEvent = (page, fieldName, el, convert = (v) => v, validate = (v) => true) => {
  convert(el.value, el);
  const event = (e) => {
    const val = e.target.value;
    page.props.setStore(
        (s) => ({
          experience: {
            ...s.experience,
            raw: s.experience.raw.map((i) => {
              if ( i.id !== page.props.info.id) {
                return i;
              }
              return {
                ...i,
                [fieldName]: convert(val, el),
                correct: {
                  ...i.correct,
                  [fieldName] : validate(val),
                }
              };
            }),
          },
        }),
    );
  };
  el.addEventListener('input', event);
};


export default Routes;
