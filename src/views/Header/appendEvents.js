import {currentSession, request, withEvents} from '../../ulils';
import {Navigator} from '../../Navigator';

export const appendEvents = (Wrappee) => withEvents(
    Wrappee, 'logout', {
      logout: {
        id: 'sign-out',
        eventName: 'click',
        event: () => {
          request.post('/api/users/logout', {}).then((r) => {
            currentSession.session = null;
            Navigator.updateAllPages();
          });
        },
      },
    },
);
