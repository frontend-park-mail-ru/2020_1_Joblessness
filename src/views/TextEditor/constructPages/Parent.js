import {withChainedPages} from '../../../ulils';

export const parent = (Wrapee, SubRoutes, props) => {
  Wrapee = props.withLocalStore(Wrapee);
  Wrapee = withChainedPages(Wrapee, SubRoutes, null, props.ROOT);
  const wrapee = new Wrapee(props.EDITOR_HOLDER_SELECTOR);
  wrapee.props.editorProps = props;
  return wrapee;
};
