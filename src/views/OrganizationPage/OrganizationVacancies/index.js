import {Page} from '../../../Page';
import './style.sass';
import template from './index.pug';
import {getOrgId} from '../getOrgInfo';

/**
 * Vacancies subpage
 */
class OrganizationVacanciesPage extends Page {
  /**
   * @return{string}
   */
  render() {
    return template({
      ...this.props,
      isOwnPage : currentSession.user.id === Number(getOrgId())
    });
  }
}

export {
  OrganizationVacanciesPage,
};
