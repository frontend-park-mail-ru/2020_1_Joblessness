export const preview = (Wrapee, props) => {
  Wrapee = props.withLocalStore(Wrapee);
  const wrapee = new Wrapee(props.CURRENT_MODE_SELECTOR);
  wrapee.props.editorProps = props;
  return wrapee;
};
