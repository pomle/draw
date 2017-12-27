import React, { Component } from 'react';
import {OrderedMap, Record} from 'immutable';

import {createPeer, createSession} from 'snex';

import Canvas from './Canvas';
import GreenRoom from './GreenRoom';

const WORDS = [
  'cat',
  'dog',
  'giraffe',
];

async function getRandomWord() {
  return WORDS[Math.random(WORDS.length) | 0];
}

const Player = Record({
  score: 0,
  ready: false,
  name: null,
  remote: null,
});

const GameState = Record({
  playerDrawing: null,
  word: null,
});

class Hub extends Component {
  constructor(props) {
    super(props);

    this.state = {
        gameState: new GameState(),
        session: null,
        players: new OrderedMap(),
    };
  }

  async componentDidMount() {
    const peer = createPeer(this.props.match.params.id);
    const session = await createSession(peer);

    session.on('connection', remote => {
        this.addPlayer(remote);

        remote.on('close', () => {
            this.removePlayer(remote);
        });
    });

    this.setState({session});
  }

  handleMessage(player, data) {
    if (data.type === 'join') {
      const updatedPlayer = player
        .set('name', data.name)
        .set('ready', true);

      this.updatePlayer(player.remote, updatedPlayer);

      player.remote.send({
        type: 'ready',
      });

      if (!this.state.players.some(player => !player.ready)) {
        const player = this.getNextPlayer();
        this.activateDrawer(player);
      }
    }
  }

  addPlayer(remote) {
    const player = new Player({remote});

    remote.on('data', data => {
      this.handleMessage(player, data);
    });

    this.updatePlayer(remote, player);
  }

  updatePlayer(remote, player) {
    const players = this.state.players.set(remote, player);
    this.setState({players});
  }

  removePlayer(remote) {
    const players = this.state.players.delete(remote);
    this.setState({players});
  }

  getNextPlayer() {
    const playerList = this.state.players.toList();
    const currentPlayer = this.state.gameState.playerDrawing;
    const currentIndex = playerList.findIndex(player => player === currentPlayer);
    const nextIndex = (currentIndex + 1) % playerList.size;
    return playerList.get(nextIndex);
  }

  async activateDrawer(drawer) {
    const word = await getRandomWord();

    this.state.players.forEach(player => {
      if (player !== drawer) {
        player.remote.send({
          type: 'guessing',
        });
      } else {
        player.remote.send({
          type: 'drawing',
          word,
        });
      }
    });

    this.setState({
      gameState: this.state.gameState
        .set('playerDrawing', drawer)
        .set('word', word)
    });
  }

  handleCorrectGuess(winner) {
    this.state.players.forEach(player => {
      if (player === winner) {

      } else {
        player.remote.send({
          type: 'drawing',
          word: this.state.gameState.word,
        });
      }
    });
  }


  renderGameState() {
    const {gameState, session, players} = this.state;
    if (gameState.playerDrawing) {
      return <Canvas player={gameState.playerDrawing}/>;
    } else {
      return <GreenRoom
        session={session}
        players={players.toList()}
      />;
    }
  }

  render() {
    return (
      <div className="Hub">
        { this.renderGameState() }
      </div>
    );
  }
}

export default Hub;
