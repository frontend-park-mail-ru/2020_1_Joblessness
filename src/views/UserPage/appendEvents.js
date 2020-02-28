import {uuid, withEvents} from '../../ulils';
import {fieldManager} from './fieldManager';
import {onOpenSettingsRequest, onUpdateAvatarRequest} from './events';

export const appendEvents = (Wrappee) => withEvents(Wrappee, 'events',
    {
      ...fieldManager.fieldsToValidate,
      openSettings: {
        id: uuid(),
        eventName: 'click',
        event: onOpenSettingsRequest,
      },
      changeAvatar: {
        id: uuid(),
        eventName: 'change',
        event: onUpdateAvatarRequest,
      },
      showMore: {
        id: uuid(),
        eventName: 'click',
        event: (a, b) => {
        // @TODO load more summaries from server
          b.props.userData.summaries = [
            ...b.props.userData.summaries,
          ];
          b.requestRender();
        },
      },
    },
);
