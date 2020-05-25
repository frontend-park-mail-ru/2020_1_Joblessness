import UserSignUpSubRoutes from './User/subRoutes';
import OrgSignUpSubRoutes from './Organization/subRoutes';
import {NewSignUp} from './User';
import {NewSignUp as NewOrgSignUp} from './Organization';
import NAVIGATION_ROUTES from '../Navigation/routes';
const Routes = [
  {
    path: 'organizations/signup',
    element: new NewOrgSignUp('#root'),
    childRoutes: [
      ...NAVIGATION_ROUTES,
      ...OrgSignUpSubRoutes,
    ],
  },
  {
    path: 'signup',
    element: new NewSignUp('#root'),
    childRoutes: [
      ...NAVIGATION_ROUTES,
      ...UserSignUpSubRoutes,
    ],
  },
];

export default Routes;
