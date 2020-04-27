export const loadManager = (Wrapee, props) => {
  Wrapee = withLoad(Wrapee, props)
  Wrapee = props.withLocalStore(Wrapee);
  const wrapee = new Wrapee(props.LoadManagerSelector);
  wrapee.props.loadableList = props;
  return wrapee;
};

const withLoad = (Wrapee, props) => {

  return class extends Wrapee {

    componentWillMount() {
      if(!this._isLoading) {
        this._isLoading = true;
        loadItems(this, props);
      }
    }
  }
}

const loadItems = async (page, props) => {
  const res = await props.load();
  if(res) {
    page.props.setStore(
      props.insertIntoStore(res)
    );
  }
  page._isLoading = false;
}