import {Page} from '../../../Page';
import './style.sass'
import template from './index.pug'
import withLocalStore from '../localStore';
import {uuid, validators, withForm} from '../../../ulils';
import {isCreationPage} from '../isCreationPage';
import {ORGANIZATION} from '../../../CONSTANTS';

class MainInfo extends Page {
  render() {
    const canChange = isCreationPage() &&
      currentSession.user.role === ORGANIZATION;
    return template({
      ...this.props,
      canChange,
    });
  }
}

MainInfo = withLocalStore(MainInfo);

MainInfo = withForm(MainInfo,
  {
    name: {
      id: uuid(),
      validator: (s) => s.length,
      required: true,
      warnMessage: 'Название поможет привлечь работадателей',
      defaultValue: (page) => page.props.getStore().mainInfo.name,
    },
    description: {
      id: uuid(),
      validator: (s) => s.length,
      defaultValue: (page) => page.props.getStore().mainInfo.description,
    },
    salaryFrom: {
      id: uuid(),
      validator: validators.isMoney,
      required: true,
      warnMessage: 'Должно быть числом',
      defaultValue: (page) => page.props.getStore().mainInfo.salaryFrom,
    },
    salaryTo: {
      id: uuid(),
      validator: validators.isMoney,
      required: true,
      warnMessage: 'Должно быть числом',
      defaultValue: (page) => page.props.getStore().mainInfo.salaryTo,
    },
  },
  {
    id: uuid(),
    eventName: 'click',
  },
  (res, page) => {

    const {description, name} = res;
    const [salaryFrom, salaryTo] = res.salaryFrom < res.salaryTo ?
      [res.salaryFrom, res.salaryTo] : [res.salaryTo, res.salaryFrom];

    page.props.setStore(s => ({
      mainInfo: {
        salaryFrom: Math.floor(salaryFrom),
        salaryTo: Math.floor(salaryTo),
        description,
        name,
      }
    }));
  }
);
export {
  MainInfo
}