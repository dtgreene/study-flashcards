import { proxy, subscribe } from 'valtio';
import MySQL from './data/mysql.js';

const STORAGE_VERSION = 0.1;

export const state = createStorageProxy('study-flashcards', {
  step: 0,
  studyOption: '0',
  shuffleEnabled: true,
  orderIndex: 0,
  orderIndices: [],
  flipped: false,
});

export const studyOptions = [
  {
    value: '0',
    label: 'MySQL',
    data: MySQL,
  },
];

export function toShuffled(array) {
  let currentIndex = array.length;
  let arraySlice = array.slice();

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    const randomValue = arraySlice[randomIndex];
    const currentValue = arraySlice[currentIndex];

    arraySlice[currentIndex] = randomValue;
    arraySlice[randomIndex] = currentValue;
  }

  return arraySlice;
}

function createStorageProxy(key, defaultValue) {
  const state = proxy(getStoredValue(key, defaultValue));

  subscribe(state, () => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({ ...state, __version: STORAGE_VERSION })
      );
    } catch (error) {
      console.error(`Could not persist state: ${error.message}`);
    }
  });

  return state;
}

function getStoredValue(key, defaultValue) {
  try {
    const storageItem = localStorage.getItem(key);

    if (storageItem) {
      const parsedItem = JSON.parse(storageItem);

      if (parsedItem.__version >= STORAGE_VERSION) {
        return parsedItem;
      } else {
        // Overwrite the saved state
        localStorage.setItem(key, JSON.stringify(defaultValue));

        return defaultValue;
      }
    }
  } catch {
    console.warn('Could not parse local storage value');
  }

  return defaultValue;
}
