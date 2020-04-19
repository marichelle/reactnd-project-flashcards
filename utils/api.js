/*
To manage your AsyncStorage database, you'll
want to create four different helper methods:

`getDecks`: return all of the decks along with their titles, questions, and answers.
`getDeck`: take in a single id argument and return the deck associated with that id.
`saveDeckTitle`: take in a single title argument and add it to the decks.
`addCardToDeck`: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
*/

import { AsyncStorage } from 'react-native';

import { decks } from './_DATA';

export const DECKS_STORAGE_KEY = 'UdaciCards:decks';

export async function addCardToDeck(id, card) {
  const deck = await getDeck(id);

  AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [id]: {
        questions: [...deck.questions].concat(card),
      },
    })
  );
}

export async function deleteDeck(id) {
  const currData = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  const newData = JSON.parse(currData);

  newData[id] = undefined;
  delete newData[id];

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newData));
}

export async function getDeck(id) {
  const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

  return JSON.parse(results)[id];
}

export async function getDecks() {
  const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

  if (results === null) {
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));

    return decks;
  }

  return JSON.parse(results);
}

export function saveDeckTitle(title) {
  AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
      },
    })
  );
}
