import validators from './validators';
import {uuid} from './uuid';
import {FieldManager} from './FieldManager';
import {withEvents} from './withEvents';
import {withNetwork} from './withNetwork';
import {withForm} from './withForm';
import {fileToB64} from './fileToB64';
import {withAuth} from './withAuth';
import {withChainedPages} from './withChainedPages';
import {currentSession} from './currentSession';
import request from './request';
export {
  currentSession,
  validators,
  request,
  uuid,
  FieldManager,
  withNetwork,
  withEvents,
  withChainedPages,
  withAuth,
  fileToB64,
  withForm,
};
export default {
  validators,
  wrappers: {
    withNetwork,
    withEvents,
    withAuth, // @TODO remove
    withForm,
    withChainedPages,
  },
  request,
};
