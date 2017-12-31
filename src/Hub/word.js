const WORDS = [
  'cat',
  'dog',
  'giraffe',
];

export async function getRandomWord() {
  return WORDS[Math.random(WORDS.length) | 0];
}
