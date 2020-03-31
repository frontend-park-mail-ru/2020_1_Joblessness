import {constructSubRoutes as constructParentRoutes} from '../subRoutes';
import {EditInfo} from './editMode';
import {PreviewInfo} from './previewMode';
import {ModeManager} from './ModeManager';
import {Navigator} from '../../../Navigator';
import {Routes as EditModeRoutes, RootPath as EditModeRootPath} from './editMode/routes'
const RootPath = 'orgMainInfo';

const PreviewPage = new PreviewInfo('#organization_main_info_current_mode');
const SubRoutes = [
  {
    path: 'previewMode/',
    alwaysOn: true,
    element: new PreviewInfo('#organization_main_info_current_mode')
  },
  {
    path: 'modeManager',
    alwaysOn: true,
    element: new ModeManager('#organization_main_info_mode_manager'),
    beforeNext: (rootPage, page, mode, status) => {
      if (mode === 'EDIT') {
        console.log('edit');
        Navigator.removeRoutes(
          constructSubRoutes([{
            path: 'previewMode/',
          }])
        );

        Navigator.addRoutes(constructSubRoutes(EditModeRoutes));

      } else if (mode === 'PREVIEW') {
        console.log('preview');
        Navigator.removeRoutes(
          constructSubRoutes([
            {
              path: 'editMode/',
            },
          ])
        );
        if(status === 'SUBMIT') {
          //@TODO send request
          rootPage.props.setStore(s => ({
            preview : [...s.raw],
          }))
        }
        if(status === 'DECLINE') {
          rootPage.props.setStore(s => ({
            raw : [...s.preview],
          }))
        }
        Navigator.addRoutes(

          constructSubRoutes([
            {
              path: 'previewMode/',
              alwaysOn: true,
              element: PreviewPage,
            },
          ])
        )
      }
    }
  }
];
console.log(SubRoutes)
const constructSubRoutes = (subRoutes) => constructParentRoutes(
  [
    {
      path: RootPath,
      childRoutes: [
        ...subRoutes,
      ],
    },
  ]
);


export {
  SubRoutes,
  RootPath,
  constructSubRoutes,
};