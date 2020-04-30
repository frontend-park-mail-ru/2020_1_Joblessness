import {Page} from '../../Page';
import template from './index.pug';
import './style.sass';
import {request, requestManager, uuid} from '../../ulils';
import {PERSON, ORGANIZATION, UNAUTHORISED} from '../../CONSTANTS';
import {currentSession} from '../../ulils';
import {getOrgId} from '../OrganizationPage/getOrgInfo';
import {getUserId} from '../PersonPage/getUserId';

const isOrgPage = () => /organizations/.test(window.location.pathname);
const isUserPage = () => /users/.test(window.location.pathname);
const getCurrentId = () => Number(window.location.pathname.replace(/\D/g, ''));
class ChosenButton extends Page {
  #elemId;
  #prevElem;
  #prevEvent
  constructor(props) {
    super(props);
    this.#elemId = uuid();
  }
  render() {
    return template({
      ...this.props,
      elemId: this.#elemId,
    });
  }

  componentWillUpdate() {
    super.componentWillUpdate();
    if (this.#prevElem) {
      this.#prevElem.removeEventListener('click', this.#prevEvent);
    }
    if (currentSession.user.role === UNAUTHORISED ||
      currentSession.user.role === ORGANIZATION ||
      (!isOrgPage() && !isUserPage()) ||
      currentSession.user.id === getCurrentId()) {
      const holder = document.querySelector(this.container);
      holder.style.display = 'none';
    } else {
      this.#prevElem = document.getElementById(this.#elemId);
      this.#prevEvent = toggleEvent(this);
      this.#prevElem?.addEventListener('click', this.#prevEvent);
      return;
    }
  }

  componentWillMount() {
    super.componentWillMount();
    if(isOrgPage()) {
      requestManager
        .tryCheckChosen(getOrgId())
        .then(async (r) => {
          const res = await r.json();
          console.log(res, getOrgId());
          if(res.like) {
            this.#prevElem =
              document
                .getElementById(this.#elemId)
                .classList
                .remove('not-chosen')
          }
        })
        .catch(() => {});
    } else {
      requestManager
        .tryCheckChosen(getUserId())
        .then(async (r) => {
          const res = await r.json();
          console.log(res, getUserId());
          if(res.like) {
            this.#prevElem =
              document
                .getElementById(this.#elemId)
                .classList
                .remove('not-chosen')
          }
        })
        .catch(() => {});
    }
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.#prevElem) {
      this.#prevElem.removeEventListener('click', this.#prevEvent);
    }
    if (currentSession.user.role === UNAUTHORISED || (!isOrgPage() && !isUserPage()) || currentSession.user.id === getCurrentId()) {
      const holder = document.querySelector(this.container);
      holder.style.display = 'none';
    } else {
      this.#prevElem = document.getElementById(this.#elemId);
      this.#prevEvent = toggleEvent(this);
      this.#prevElem.addEventListener('click', this.#prevEvent);
      return;
    }
  }
}

const toggleEvent = (page) => async (e) => {
  const likedId = isOrgPage() ? getOrgId() :
    isUserPage() ? getUserId() : null;
  if (likedId) {
    try {
      const res = await requestManager.trySetLike(likedId);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  e.target.classList.toggle('not-chosen');
};

const ChosenButtonRoutes = [
  {
    element: new ChosenButton('#chosen_button'),
    path: 'chosen',
    alwaysOn: true,
  },
];

export {
  ChosenButton,
  ChosenButtonRoutes,
};
