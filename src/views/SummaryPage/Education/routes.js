import {createEditor} from '../../TextEditor';
import {withLocalStore} from '../localStore';

import {Parent} from './Parent';
import {Preview} from './Preview';
import {Edit} from './Edit';
import {AddItem} from './AddItem';
import {ModeManager} from './ModeManager';
import {Item} from './Item';
import {requestManager, uuid, validators} from '../../../ulils';

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
    education: {
      ...s.education,
      preview: [...s.education.raw],
    },
  }),
  DECLINE_REDUCER: (s) => ({
    education: {
      ...s.education,
      raw: [...s.education.preview],
    },
  }),
  EXTRACT_REDUCER: (s) => {
    return s.education;
  },
  REPLACE_REDUCER: (store, sub) => {
    return {
      education: {
        ...store.education,
        ...sub,
      },
    };
  },
  INSERT_REDUCER: (item) => (s) => ({
    education: {
      ...s.education,
      raw: [...s.education.raw, item],
    },
  }),
  MAX_SIZE: 5,
  ROOT: 'education/',
  EDITOR_HOLDER_SELECTOR: '#summary_education',
  ROOT_TEMPLATE: (childRoutes = []) => [
    {
      path: 'summaries/*',
      childRoutes,
    },
  ],
  CUSTOM_LISTENERS: {
    initItem: (page, props) => ({
      id: uuid(),
      institution: '',
      speciality: '',
      graduated: '',
      type: '',
      correct: {
        institution: false,
        speciality: false,
        graduated: false,
        type: false,
      }
    }),
    init: (page, props) => {
      const fields = {
        institution: uuid(),
        speciality: uuid(),
        graduated: uuid(),
        type: uuid(),
      };
      page.props.fields = fields;
    },
    set: (page, props) => {
      initValues(page, page.props.fields);
      initEvents(page, page.props.fields);
    },
  },
  ON_ITEM_LIMIT : () => {
    alert('Можно указать не более 5 образований')
  },
  onApply: (props, page) => new Promise((resolve, reject) => {
    const edu = page.props.getStore().education.raw;
    for( let e of edu) {
      const {graduated, institution, speciality, type} = e.correct;
      const isCorrect =  graduated && institution && speciality && type
      if(!isCorrect) {
        alert('Не все поля в образовании заполнены верно');
        if(!graduated) alert('Проверьте поле "Год окончания"');
        if(!institution) alert('Проверьте поле "Учебное заведение"');
        if(!speciality) alert('Проверьте поле "Специальность"');
        if(!type) alert('Проверьте поле "Тип"');
        reject();
      }
    }
    resolve();
  }),
});


const initValues = (page, fields) => {
  const institutionField = document.querySelector(`#${fields.institution}`);
  const specialityField = document.querySelector(`#${fields.speciality}`);
  const graduatedField = document.querySelector(`#${fields.graduated}`);
  const typeField = document.querySelector(`#${fields.type}`);

  const {institution, speciality, graduated, type} =
    page.props.getStore().education.raw.find((i) => i.id === page.props.info.id);
  //
  institutionField.value = institution;
  specialityField.value = speciality;
  graduatedField.value = graduated;
  typeField.value = type;
};


const initEvents = (page, fields) => {
  const institutionField = document.querySelector(`#${fields.institution}`);
  const specialityField = document.querySelector(`#${fields.speciality}`);
  const graduatedField = document.querySelector(`#${fields.graduated}`);
  const typeField = document.querySelector(`#${fields.type}`);


  updateEvent(page, 'institution', institutionField,
      raiseWarn((s) => s.length <= 30, 'До 30 символов'), (s) => s.length <= 30);
  updateEvent(page, 'speciality', specialityField,
      raiseWarn((s) => s.length <= 30, 'До 30 символов'), (s) => s.length <= 30);
  updateEvent(page, 'graduated', graduatedField,
      raiseWarn(n => 1900 <= parseInt(n) && parseInt(n) <= new Date().getFullYear() + 10, 'Год YYYY'), n => 1900 <= parseInt(n) && parseInt(n) <= new Date().getFullYear() + 10);
  updateEvent(page, 'type', typeField,
      raiseWarn((s) => s.length <= 30, 'До 30 символов'), (s) => s.length <= 10);
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
          education: {
            ...s.education,
            raw: s.education.raw.map((i) => {
              if ( i.id !== page.props.info.id) {
                return i;
              }
              return {
                ...i,
                [fieldName]: convert(val, el),
                correct: {
                  ...i.correct,
                  [fieldName]: validate(val),
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
