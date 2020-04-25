import {SettingsPage} from './index';
import {BaseInfoPage} from './BaseInfo';
import {ContactsPage} from './Contacts';
import {AboutPage} from './About';

const CONTAINER = '#users_current_section';

const ROOT_ELEMENT = new SettingsPage(CONTAINER);
const SubRoutes = [
  {
    path: 'baseInfo',
    alwaysOn: true,
    element: new BaseInfoPage('#settings_base'),
  },
  {
    path: 'contacts',
    alwaysOn: true,
    element: new ContactsPage('#settings_contacts'),
  },
  {
    path: 'about',
    alwaysOn: true,
    element: new AboutPage('#settings_about'),
  },
];

export default SubRoutes;

export {
  SubRoutes,
  ROOT_ELEMENT,
};
