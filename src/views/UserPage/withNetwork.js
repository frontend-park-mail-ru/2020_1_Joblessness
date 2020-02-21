const withNetwork = (url, WrappedComponent, propName, defaultProps = {}) => {

    return class extends WrappedComponent {
        constructor(...args) {
            super(args);
            this.props[propName] = defaultProps;

            fetch(url)
                .then(r => r.json())
                .then(json => {
                    this.props[propName] = json;
                    if (!this.domBox.hidden)
                        this.requestRender()
                })
                .catch(console.err);
        }
    }
};

export {
    withNetwork
}