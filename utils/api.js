/*
To manage your AsyncStorage database, you'll
want to create four different helper methods:

`getDecks`: return all of the decks along with their titles, questions, and answers.
`getDeck`: take in a single id argument and return the deck associated with that id.
`saveDeckTitle`: take in a single title argument and add it to the decks.
`addCardToDeck`: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
*/

import { AsyncStorage } from 'react-native';

import { _getDecks } from './_DATA';

export const DECKS_STORAGE_KEY = 'UdaciCards:decks';

export function getInitialData() {
  return _getDecks().then((decks) => ({ decks }));
}

export function addCardToDeck(title, card) {}

export function getDeck(id) {}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY);
}

export function saveDeckTitle(title) {}
