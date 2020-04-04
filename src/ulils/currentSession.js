/**
 * stores current session. Works as singleton
 */
import {ORGANIZATION, PERSON, UNAUTHORISED} from '../CONSTANTS';

class CurrentSession {
  #user;
  #isAuthenticated;
  #events;
  /**
   * init default value
   */
  constructor() {
    this.#user = {
      id: 0,
      role: UNAUTHORISED,
    };
    this.#events = {
      change: [],
    };
    this.#isAuthenticated = false;
  }

  set session(user) {
    if (user === null) {
      this.#user = {
        id: 0,
        role: UNAUTHORISED,
      };
      this.#isAuthenticated = false;
      this.onChange();
      return;
    }
    const {id, role} = user;
    if (typeof id === 'string') {
      if (isNaN(parseInt(id))) {// float will be floored e.g 123.1 => 123
        throw new Error(`
        Expected integer as user ID, received ${id}
        `);
      }
      if (![UNAUTHORISED, PERSON, ORGANIZATION].contains(role)) {
        throw new Error(`
        Expected one of UNAUTHORISED, PERSON, ORGANIZATION as role. Received ${role};
        `);
      }
      this.#user = {
        id: parseInt(id),
        role: role,
      };

      this.#isAuthenticated = true;
      this.onChange();
    } else if (typeof id === 'number') {
      if (isNaN(id)) {
        throw new Error(`
        Expected integer as user ID, received NaN`);
      }
      this.#user = {
        id: Math.floor(id),
        role: role,
      };
      this.#isAuthenticated = true;
      this.onChange();
    } else {
      throw new Error(`
      Expected string or number as ID.
      Or null to clear session.
      String or number may represent integer.
      otherwise it will be floored
      received ${id}`);
    }
  }

  /**
   *
   * @return {{userId: *}|null}
   */
  get user() {
    return {...this.#user}
  }


  /**
   *
   * @return {boolean}
   */
  get isAuthenticated() {
    return this.#isAuthenticated;
  }

  onChange() {
    console.log(this.#events)
    this.#events['change'].forEach((e) => (e?.({...this.#user})));
  }
  addEventListener(eventName, event) {
    this.#events[eventName]?.push(event);
  }
  removeEventListener(eventName, event) {
    this.#events[eventName] = this.#events[eventName].filter( (e) => e !== event);
  }
}

const currentSession = new CurrentSession();

export {
  currentSession,
};
