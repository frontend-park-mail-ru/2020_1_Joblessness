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
  const companyNameField = document.querySelector(`#${fields.companyName}`);
  const roleField = document.querySelector(`#${fields.role}`);
  const experienceFromField = document.querySelector(`#${fields.experienceFrom}`);
  const experienceToField = document.querySelector(`#${fields.experienceTo}`);
  const responsibilitiesField = document.querySelector(`#${fields.responsibilities}`);

  // console.log(page.props.item, page.props, page.props.getStore().experience.raw);
  const {companyName, role, experienceFrom,
    experienceTo, responsibilities} = page.props.getStore().experience.raw.find((i) => i.id === page.props.info.id);
  //
  companyNameField.value = companyName;
  roleField.value = role;
  experienceFromField.value = experienceFrom;
  experienceToField.value = experienceTo;
  responsibilitiesField.value = responsibilities;
};


const initEvents = (page, fields) => {
  const companyNameField = document.querySelector(`#${fields.companyName}`);
  const roleField = document.querySelector(`#${fields.role}`);
  const experienceFromField = document.querySelector(`#${fields.experienceFrom}`);
  const experienceToField = document.querySelector(`#${fields.experienceTo}`);
  const responsibilitiesField = document.querySelector(`#${fields.responsibilities}`);


  updateEvent(page, 'companyName', companyNameField,
      raiseWarn((s) => s.length >= 5 && s.length <= 15, '5-15 символов'));
  updateEvent(page, 'role', roleField,
      raiseWarn((s) => s.length <= 30, 'До 30 символов'));
  updateEvent(page, 'experienceFrom', experienceFromField,
      raiseWarn((v) => Number(v) > 0, 'Положительное число'));
  updateEvent(page, 'experienceTo', experienceToField,
      raiseWarn((v) => Number(v) > 0, 'Положительное число'));
  updateEvent(page, 'responsibilities', responsibilitiesField,
      raiseWarn((s) => /^[a-zA-Z0-9_ ]*$/.test(s), 'Ключевые слова через пробел'));
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
          experience: {
            ...s.experience,
            raw: s.experience.raw.map((i) => {
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
