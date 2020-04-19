import { ADD_CARD, ADD_DECK, REMOVE_DECK, RECEIVE_DECKS } from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      return state;

    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          questions: [],
          title: action.title,
        },
      };

    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case REMOVE_DECK:
      return state;

    default:
      return state;
  }
}
