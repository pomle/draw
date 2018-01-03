const WORDS = [
  'cat',
  'dog',
  'giraffe',
  'car',
  'bonfire',
  'eiffeltower',
  'microphone',
  'bicycle',
  'runner',
  'sunset',
  'gym',
  'diver',
  'beach ball',
  'rock star',
];

export async function getRandomWord() {
  return WORDS[Math.random() * WORDS.length | 0];
}

export function matching(word1, word2) {
    return treat(word1) === treat(word2);
}

function treat(word) {
    return word.toUpperCase().replace(/ /g, '');
}
