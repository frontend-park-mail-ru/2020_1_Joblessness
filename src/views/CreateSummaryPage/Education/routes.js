import {createEditor} from '../../TextEditor';
import {withLocalStore} from '../localStore';

import {Parent} from './Parent';
import {Preview} from './Preview';
import {Edit} from './Edit';
import {AddItem} from './AddItem';
import {ModeManager} from './ModeManager';
import {Item} from './Item';
import {requestManager, uuid} from '../../../ulils';

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
      console.log(page);
      console.log(page.props.fields);
      initValues(page, page.props.fields);
      initEvents(page, page.props.fields);
    },
  },
  onApply: (props, page) => new Promise((resolve, reject) => {
    resolve();
    // if (!isCreationPage()) {
    //   const experience = page.props.getStore().experience;
    //   experience.preview = experience.raw;
    //   requestManager.tryChangeVacancy({
    //     experience: JSON.stringify(experience)
    //   }, getVacId())
    //     .then(resolve)
    //     .catch(reject)
    // } else {
    //   resolve()
    // }
  }),
});


const initValues = (page, fields) => {
  const institutionField = document.querySelector(`#${fields.institution}`);
  const specialityField = document.querySelector(`#${fields.speciality}`);
  const graduatedField = document.querySelector(`#${fields.graduated}`);
  const typeField = document.querySelector(`#${fields.type}`);

  // console.log(page.props.item, page.props, page.props.getStore().experience.raw);
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
      raiseWarn((s) => s.length >= 5 && s.length <= 15, '5-15 символов'));
  updateEvent(page, 'role', specialityField,
      raiseWarn((s) => s.length <= 30, 'До 30 символов'));
  updateEvent(page, 'graduated', graduatedField,
      raiseWarn((v) => Number(v) > 0, 'Положительное число'));
  updateEvent(page, 'type', typeField,
      raiseWarn((s) => s.length <= 10, 'До 10 символов'));
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
          education: {
            ...s.education,
            raw: s.education.raw.map((i) => {
              if ( i.id !== page.props.info.id) {
                return i;
              }
              console.log();
              return {
                ...i,
                [fieldName]: convert(val, el),
              };
            }),
          },
        }),
    );
    console.log(page.props.getStore());
  };
  el.addEventListener('input', event);
};


export default Routes;
