/**
 * Осуществляет управление и валидацию
 * форм(любых элементов на странице) перед отправкой формы
 * @class
 */
export class FieldManager {
    /**
     * Данный класс работает с оберткой withEvents
     * @param {string[] | Object[]} fieldsToValidate - массив из строк и/или объектов
     * Если элемент - строка, то создается стандартный ивент,
     * привязанный к элементу, у которого id равно значению строки
     * @example
     * "some_id" --> {id: "some_id", eventName: "change", event: (e, page) => {this.field[key] = e.target.value}}
     * Если использован объект, то его поля аналогичны полям в примере,
     * Функция event должна возращать какое-то значение для хранения его в поле field(передается при подтверждении)
     * @param {Object}apply
     * объект, содержащий описание ивента, при вызове которого форма отправляется.
     * @example
     * {
     *     id: "some_button",
     *     eventName: "click",
     *     event: (e, page, field, callWarnings) => {
     *          e - событие
     *          page - компонента, к которой привязано событие
     *          field - список полей, обработанных через fieldsToValidate
     *          callWarnings - подсветить поля в случае некоррекного ввода
     *          Полноценный пример находится в UserPage
     *     }
     * }
     * @param {string} applyFieldName - название поля, в который выносится ивент apply
     * @param {function[]}warnings -  массив функций, вызываемых при ошибке валидации.
     * Если отсутствует, то вызывается стандартный warning
     * @example использование класса
     * const fieldManager = new FieldManager(["someId", "anotherId"], {
     *     id : "button",
     *     eventName: "click",
     *     event: (e, that, field, callWarnings) => {///}
     * })
     * const PageWithEvents = {
     *      ...fieldManager.fieldsToValidate,
     *      остальные ивенты
     * }
     */
    constructor(fieldsToValidate,
                apply,
                applyFieldName = 'acceptFields',
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
            if( warnings && warnings.length ) {
                warnings.forEach(w => w(this.fieldsToValidate));
            } else {
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
            }
        };
        this.fieldsToValidate[applyFieldName] = {
            id: apply.id,
            eventName: apply.eventName,
            event: (e, that) => {
                apply.event(e, that, this.field, this.callWarnings)
            }
        }
    }
}