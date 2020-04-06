import constructPages from './constructPages';
import constructRoutes from './constructRoutes';
import {createEditorProps} from './EDITOR_PROPS';
import createWithLocalStoreDefault from './localStore';

// @TODO сделать работу со store более гибкой

// @TODO create default store

const createEditor = ({Parent, Preview, Edit, AddItem, Item, ModeManager, withLocalStore = createWithLocalStoreDefault()}, props) => {
  props = createEditorProps(props);
  props.withLocalStore = withLocalStore;
  const ItemPage = constructPages.item(Item, props);
  props.Item = ItemPage;

  const previewPage = constructPages.preview(Preview, props); // Done
  const previewRoutesTemplate = constructRoutes
      .preview(previewPage, props); // Done
  const previewRoutes = previewRoutesTemplate(); // Done

  const addItemPage = constructPages.addItem(AddItem, props); // Done
  const addItemRoutesTemplate = constructRoutes
      .addItem(addItemPage, props); // Done
  const addItemRoutes = addItemRoutesTemplate(); // Done

  const editPage = constructPages.edit(Edit, addItemRoutes, props); // Done
  const editRoutesTemplate = constructRoutes.edit(editPage, props); // Done
  // const editRoutes = [...editRoutesTemplate(), ...addItemRoutes]; // Done
  const editRoutes = editRoutesTemplate(addItemRoutes); // Done
  const modeManagerPage = constructPages.modeManager(ModeManager, props);
  const modeManagerRoutesTemplate = constructRoutes
      .modeManager(modeManagerPage, props);
  const modeManagerRoutes = modeManagerRoutesTemplate();

  const parentPage = constructPages.parent(Parent, [
    ...previewRoutes,
    ...modeManagerRoutes,
  ], props);
  const parentRoutesTemplate = constructRoutes
      .parent(parentPage, props); // done
  const parentRoutes = parentRoutesTemplate([
    ...previewRoutes,
    ...modeManagerRoutes,
  ]);

  const PREVIEW_MODE_ROUTE = props.ROOT_TEMPLATE(parentRoutesTemplate([
    ...previewRoutesTemplate(),
  ]));
  const PREVIEW_MODE_ROOT = props.ROOT_TEMPLATE(parentRoutesTemplate([
    ...previewRoutesTemplate(),
  ]));
  const EDIT_MODE_ROOT = props
      .ROOT_TEMPLATE(parentRoutesTemplate(editRoutesTemplate()));
  const EDIT_MODE_ROUTE = props.ROOT_TEMPLATE(parentRoutesTemplate(editRoutes));
  props.PREVIEW_MODE_ROUTE = PREVIEW_MODE_ROUTE;
  props.PREVIEW_MODE_ROOT = PREVIEW_MODE_ROOT;
  props.EDIT_MODE_ROOT = EDIT_MODE_ROOT;
  props.EDIT_MODE_ROUTE = EDIT_MODE_ROUTE;
  props.constructEditRoutes = (childRoutes) => props.ROOT_TEMPLATE(
      parentRoutesTemplate([...editRoutesTemplate(childRoutes)]));
  props.constructEditRoutes = (childRoutes) => props.ROOT_TEMPLATE(
      parentRoutesTemplate(editRoutesTemplate(childRoutes),
          addItemRoutes,
      ));
  return parentRoutes;
};


export {
  createEditor,
};
