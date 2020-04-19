import { getDecks } from '../utils/api';

export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

export function addCard(id, card) {
  return {
    type: ADD_CARD,
    id,
    card,
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  };
}

export function handleInitialData() {
  // redux thunk pattern
  return (dispatch) => {
    return getDecks().then(({ decks }) => {
      dispatch(receiveDecks(decks));
    });
  };
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id,
  };
}
