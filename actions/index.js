import { getInitialData } from '../utils/api';

export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

export const handleInitialData = (decks) => {
  // redux thunk pattern
  return (dispatch) => {
    return getInitialData().then(({ decks }) => {
      dispatch(receiveDecks(decks));
    });
  };
};

export function addCard(card, deckId) {
  return {
    type: ADD_CARD,
    card,
    deckId,
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  };
}

export function removeDeck(deckId) {
  return {
    type: REMOVE_DECK,
    deckId,
  };
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}
