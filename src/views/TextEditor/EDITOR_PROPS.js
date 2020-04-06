import {uuid} from '../../ulils';

export const createEditorProps = ({ROOT, EDITOR_HOLDER_SELECTOR, ROOT_TEMPLATE, ...rest}) => {
  if (!ROOT) {
    throw new Error('No ROOT specified');
  }
  if (!ROOT_TEMPLATE) {
    throw new Error('No ROOT_TEMPLATE specified');
  }
  if (!EDITOR_HOLDER_SELECTOR) {
    throw new Error('No EDITOR_HOLDER_SELECTOR specified');
  }

  const MODE_MANAGER_ID = uuid();
  const CURRENT_MODE_ID = uuid();
  const ADD_PARAGRAPH_ID = uuid();

  const SUBMIT_REDUCER = (s) => ({
    preview: [...s.raw],
  });
  const DECLINE_REDUCER = (s) => ({
    raw: [...s.preview],
  });

  const MODE_MANAGER_SELECTOR = `#${MODE_MANAGER_ID}`;
  const CURRENT_MODE_SELECTOR = `#${CURRENT_MODE_ID}`;
  const ADD_PARAGRAPH_SELECTOR = `#${ADD_PARAGRAPH_ID}`;
  return {
    MODE_MANAGER_SELECTOR,
    CURRENT_MODE_SELECTOR,
    ADD_PARAGRAPH_SELECTOR,

    MODE_MANAGER_ID,
    CURRENT_MODE_ID,
    ADD_PARAGRAPH_ID,

    SUBMIT_REDUCER,
    DECLINE_REDUCER,
    EDITOR_HOLDER_SELECTOR,
    ROOT_TEMPLATE,
    ROOT,

    ...rest,
  };
};
