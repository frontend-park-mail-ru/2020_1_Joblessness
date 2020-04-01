import validators from './validators';
import {uuid} from './uuid';
import {FieldManager} from './FieldManager';
import {requestManager} from './requestManager';
import {withEvents} from './withEvents';
import {withNetwork} from './withNetwork';
import {withForm} from './withForm';
import {fileToB64} from './fileToB64';
import {withAuth} from './withAuth';
import {withChainedPages} from './withChainedPages';
import {createLocalStore} from './createLocalStore';
import {currentSession} from './currentSession';
import request from './request';
export {
  currentSession,
  createLocalStore,
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
    createLocalStore,
  },
  request,
};