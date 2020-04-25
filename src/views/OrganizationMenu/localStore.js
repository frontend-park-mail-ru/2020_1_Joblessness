import {createLocalStore} from '../../ulils';

const withLocalStore = createLocalStore({
  responses: [],
  currentPage: 'responses',
  messenger: {
    currentPage: 'dialog',
    messages: [
      {
        from: 'user1',
        to: 'user2',
        toYou: true,
        message: 'stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring',
        date: new Date()
      },
      {
        from: 'user2',
        to: 'user1',
        message: 'string',
        toYou: false,
        date: new Date()
      },
      {
        from: 'user2',
        to: 'user1',
        message: 'strinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпgstrinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпgstrinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпg',
        toYou: false,
        date: new Date()
      },
      {
        from: 'user1',
        to: 'user2',
        toYou: true,
        message: 'stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring',
        date: new Date()
      },
      {
        from: 'user2',
        to: 'user1',
        message: 'string',
        toYou: false,
        date: new Date()
      },
      {
        from: 'user2',
        to: 'user1',
        message: 'strinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпgstrinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпgstrinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпg',
        toYou: false,
        date: new Date()
      },
      {
        from: 'user1',
        to: 'user2',
        toYou: true,
        message: 'stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring',
        date: new Date()
      },
      {
        from: 'user2',
        to: 'user1',
        message: 'string',
        toYou: false,
        date: new Date()
      },
      {
        from: 'user2',
        to: 'user1',
        message: 'strinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпgstrinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпgstrinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпg',
        toYou: false,
        date: new Date()
      },
      {
        from: 'user1',
        to: 'user2',
        toYou: true,
        message: 'stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring',
        date: new Date()
      },
      {
        from: 'user2',
        to: 'user1',
        message: 'string',
        toYou: false,
        date: new Date()
      },
      {
        from: 'user2',
        to: 'user1',
        message: 'strinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпgstrinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпgstrinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпg',
        toYou: false,
        date: new Date()
      },
      {
        from: 'user1',
        to: 'user2',
        toYou: true,
        message: 'stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring',
        date: new Date()
      },
      {
        from: 'user2',
        to: 'user1',
        message: 'string',
        toYou: false,
        date: new Date()
      },
      {
        from: 'user2',
        to: 'user1',
        message: 'strinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпgstrinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпgstrinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпg',
        toYou: false,
        date: new Date()
      },
      {
        from: 'user1',
        to: 'user2',
        toYou: true,
        message: 'stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring',
        date: new Date()
      },
      {
        from: 'user2',
        to: 'user1',
        message: 'string',
        toYou: true,
        date: new Date()
      },
      {
        from: 'user2',
        to: 'user1',
        message: 'strinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпgstrinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпgstrinавплдоываплдваыопдываповылдапоыдваповалдповалповаыдпg',
        toYou: false,
        date: new Date()
      },
    ]
  }
}, true, () => `responses/${currentSession.user.id}`, true);
export default withLocalStore;

export {
  withLocalStore,
};
