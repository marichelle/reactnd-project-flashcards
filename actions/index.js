import {
  addCardToDeck,
  deleteDeck,
  getDecks,
  resetDecks,
  saveDeckTitle,
} from '../utils/api';

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

// Public AsyncStorage

export function handleAddCardToDeck(id, card) {
  // redux thunk pattern
  return (dispatch) => {
    return addCardToDeck(id, card).then(() => dispatch(addCard(id, card)));
  };
}

export function handleGetDecks() {
  // redux thunk pattern
  return (dispatch) => {
    return getDecks().then((decks) => dispatch(receiveDecks(decks)));
  };
}

export function handleDeleteDeck(id) {
  // redux thunk pattern
  return (dispatch) => {
    return deleteDeck(id).then(() => dispatch(removeDeck(id)));
  };
}

export function handleResetDecks() {
  // redux thunk pattern
  return (dispatch) => {
    return getDecks().then((decks) => {
      dispatch(receiveDecks(decks));
      resetDecks();
    });
  };
}

export function handleSaveDeck(title) {
  // redux thunk pattern
  return (dispatch) => {
    return saveDeckTitle(title).then(() => dispatch(addDeck(title)));
  };
}
