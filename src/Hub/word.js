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
