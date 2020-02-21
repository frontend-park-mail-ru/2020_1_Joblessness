export const withEvents = (WrappedComponent, propName, events) => {

    return class extends WrappedComponent {
        constructor(...args) {
            super(args);
            this.props[propName] = events;
        }

        componentDidMount = () => {
            Object.keys(events).map(e => {
                document.getElementById(events[e].id).addEventListener(events[e].eventName, (ev) => {
                    events[e].event(ev, this)
                })
            })
        }
    }
};