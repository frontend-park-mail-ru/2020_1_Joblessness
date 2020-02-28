import {uuid, withEvents} from '../../ulils';

export const appendEvents = (Wrappee) => withEvents(Wrappee, 'events',
    {
      showMore: {
        id: uuid(),
        eventName: 'click',
        event: (a, b) => {
        // @TODO load more vacancies from server
          b.props.vacancies = [
            ...b.props.vacancies,
          ];
          b.requestRender();
        },
      },
    },
);
