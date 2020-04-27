import UserSignUpSubRoutes from './User/subRoutes';
import OrgSignUpSubRoutes from './Organization/subRoutes';
import {NewSignUp} from './User';
import {NewSignUp as NewOrgSignUp} from './Organization';
const Routes = [
  {
    path: 'organizations/signup',
    element: new NewOrgSignUp('#root'),
    childRoutes: [
      ...OrgSignUpSubRoutes,
    ],
  },
  {
    path: 'signup',
    element: new NewSignUp('#root'),
    childRoutes: [
      ...UserSignUpSubRoutes,
    ],
  },
];

export default Routes;
