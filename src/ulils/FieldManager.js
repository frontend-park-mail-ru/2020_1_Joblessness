export class FieldManager {
    constructor(fieldsToValidate,
                apply,
                applyFieldName = 'acceptField',
                warnings = []) {
        this.field = {};
        this.fieldsToValidate =
            Object
                .keys(fieldsToValidate)
                .reduce((acc, key) => {
                        this.field[key] = null;
                        if (typeof fieldsToValidate[key] === 'string') {
                            acc[key] = {
                                id: fieldsToValidate[key],
                                eventName: 'change',
                                event: (e, that) => {
                                    this.field[key] = e.target.value
                                }
                            };
                        } else {
                            acc[key] = {
                                id: fieldsToValidate[key].id,
                                eventName: fieldsToValidate[key].eventName,
                                event: (e, that) => {
                                    this.field[key] = fieldsToValidate[key].event(
                                        e, that
                                    )
                                }
                            }
                        }
                        return acc;
                    },
                    {}
                );
        this.callWarnings = () => {
            warnings.forEach(w => w());
            Object.keys(this.fieldsToValidate).map(
                key => {
                    if (!this.field[key]) {
                        const e = document.getElementById(this.fieldsToValidate[key].id);
                        e.classList.add("red-input");
                        setTimeout(() => {
                            e.classList.remove("red-input")
                        }, 200);
                    }
                }
            );
        };
        this[applyFieldName] = {
            id: apply.id,
            eventName: apply.eventName,
            event: (e, that) => {
                apply.event(e, that, this.field, this.callWarnings)
            }
        }
    }
}