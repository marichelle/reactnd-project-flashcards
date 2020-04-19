import { ADD_CARD, ADD_DECK, REMOVE_DECK, RECEIVE_DECKS } from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      const { id, card } = action;

      return {
        ...state,
        [id]: {
          ...[id],
          questions: state[id].questions.concat([card]),
        },
      };

    case ADD_DECK:
      const { title } = action;

      return {
        ...state,
        [title]: {
          questions: [],
          title: title,
        },
      };

    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case REMOVE_DECK:
      // https://stackoverflow.com/questions/34401098/remove-a-property-in-an-object-immutably
      const { [action.id]: value, ...remaining } = state;

      return remaining;

    default:
      return state;
  }
}
