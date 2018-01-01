import {Record} from 'immutable';

export const GameState = Record({
  playerDrawing: null,
  scoreRate: null,
  word: null,
});

export const Player = Record({
  score: 0,
  ready: false,
  name: null,
  remote: null,
});
