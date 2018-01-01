const FIXTURES = [
  [
    'Happy',
    'Trippy',
    'Cute',
    'Fancy',
    'Rowdy',
  ],
  [
    'Tiger',
    'Hippo',
    'Snek',
    'Doodler',
    'Spy',
  ],
];

function rand(array) {
  const index = Math.random() * array.length | 0;
  return array[index];
}

export function createRandomUsername() {
  return rand(FIXTURES[0]) + rand(FIXTURES[1]);
}
