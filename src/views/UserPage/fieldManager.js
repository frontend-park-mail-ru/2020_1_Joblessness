import {FieldManager, uuid, validators} from '../../ulils';
import {onSettingsChangeRequest} from './events';

export const fieldManager = new FieldManager({
  validateFirstName: {
    id: uuid(),
    eventName: 'change',
    event: (e, that) => {
      return validators.isSlavicName(e.target.value) ? e.target.value : null;
    },
  },
  validateLastName: {
    id: uuid(),
    eventName: 'change',
    event: (e, that) => {
      return validators.isSlavicName(e.target.value) ? e.target.value : null;
    },
  },
  validatePassword: {
    id: uuid(),
    eventName: 'change',
    event: (e, that) => {
      return validators.isPassword(e.target.value) ? e.target.value : null;
    },
  },
},
{
  id: uuid(),
  eventName: 'click',
  event: onSettingsChangeRequest,
},
'applyChanges',
);
