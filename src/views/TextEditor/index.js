import constructPages from './constructPages';
import constructRoutes from './constructRoutes';
import {createEditorProps} from './EDITOR_PROPS';
import createWithLocalStoreDefault from './localStore';

const createEditor = ({Parent, Preview, Edit,
  AddItem, Item, ModeManager,
  withLocalStore = createWithLocalStoreDefault()},
props) => {
  props = createEditorProps(props);
  props.withLocalStore = withLocalStore;
  const ItemPage = constructPages.item(Item, props);
  props.Item = ItemPage;

  const previewPage = constructPages.preview(Preview, props);
  const previewRoutesTemplate = constructRoutes.preview(previewPage, props);
  const previewRoutes = previewRoutesTemplate();

  const addItemPage = constructPages.addItem(AddItem, props);
  const addItemRoutesTemplate = constructRoutes.addItem(addItemPage, props);
  const addItemRoutes = addItemRoutesTemplate();

  const editPage = constructPages.edit(Edit, addItemRoutes, props);
  const editRoutesTemplate = constructRoutes.edit(editPage, props);

  const editRoutes = editRoutesTemplate(addItemRoutes);
  const modeManagerPage = constructPages.modeManager(ModeManager, props);
  const modeManagerRoutesTemplate =
    constructRoutes.modeManager(modeManagerPage, props);

  const modeManagerRoutes = modeManagerRoutesTemplate();

  const parentPage = constructPages.parent(Parent, [
    ...previewRoutes,
    ...modeManagerRoutes,
  ], props);
  const parentRoutesTemplate = constructRoutes.parent(parentPage, props);
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
  const EDIT_MODE_ROOT = props.ROOT_TEMPLATE(parentRoutesTemplate(editRoutesTemplate()));
  const EDIT_MODE_ROUTE = props.ROOT_TEMPLATE(parentRoutesTemplate(editRoutes));
  props.PREVIEW_MODE_ROUTE = PREVIEW_MODE_ROUTE;
  props.PREVIEW_MODE_ROOT = PREVIEW_MODE_ROOT;
  props.EDIT_MODE_ROOT = EDIT_MODE_ROOT;
  props.EDIT_MODE_ROUTE = EDIT_MODE_ROUTE;
  props.constructEditRoutes = (childRoutes) => props.ROOT_TEMPLATE(parentRoutesTemplate([...editRoutesTemplate(childRoutes)]));
  props.constructEditRoutes = (childRoutes) => props.ROOT_TEMPLATE(parentRoutesTemplate(
      editRoutesTemplate(childRoutes),
      addItemRoutes,
  ));
  return parentRoutes;
};


export {
  createEditor,
};
