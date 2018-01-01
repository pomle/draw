import React, { Component } from 'react';
import {OrderedMap} from 'immutable';

import {createPeer, createSession} from 'snex';

import PaintRoom from './PaintRoom';
import GreenRoom from './GreenRoom';

import {Player, GameState} from './state.js';
import {getRandomWord} from './word.js';

async function startSession(sessionId) {
  if (!sessionId) {
    const peer = createPeer();
    return createSession(peer);
  }

  for (let count = 0;; count++) {
    try {
      const sessionAttempt = sessionId + (count > 0 ? count : '');
      console.log('Trying session', sessionAttempt);
      const peer = createPeer(sessionAttempt);
      return await createSession(peer);
    } catch (e) {
      console.log(e);
    }
  }
}

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
    const session = await startSession(this.props.sessionId);

    session.on('connection', remote => {
        this.addPlayer(remote);

        remote.on('close', () => {
            this.removePlayer(remote);
        });
    });

    this.setState({session});
  }

  handleMessage(player, data) {
    console.log('Incoming message', data, player);

    if (data.type === 'join') {
      const updatedPlayer = player
        .set('name', data.name)
        .set('ready', true);

      this.updatePlayer(updatedPlayer);

      this.sendMessageTo(player, {
        type: 'ready',
      });

      if (!this.state.players.some(player => !player.ready)) {
        this.nextPlayer();
      }
    } else if (data.type === 'guess') {
      this.handleGuess(player, data.guess);
    }
  }

  handleGuess(playerGuessing, guess) {
    const {gameState} = this.state;

    const correct = guess === gameState.word;

    if (correct) {
      debugger;

      const {scoreRate, playerDrawing} = gameState;

      this.sendMessageTo(playerDrawing, {
        type: 'correct-guess',
        scoreRate,
      });

      this.sendMessageTo(playerGuessing, {
        type: 'win',
        guess,
        scoreRate,
      });

      this.updatePlayer(playerGuessing
        .set('score', playerGuessing.score + scoreRate));

      this.updatePlayer(playerDrawing
        .set('score', playerDrawing.score + scoreRate));

      this.nextPlayer();
    }
  }

  addPlayer(remote) {
    const player = new Player({remote});

    remote.on('data', data => {
      this.handleMessage(player, data);
    });

    this.updatePlayer(player);
  }

  updatePlayer(player) {
    const players = this.state.players.set(player.remote, player);
    this.setState({players});
  }

  nextPlayer() {
    const player = this.getNextPlayer();
    this.activateDrawer(player);
  }

  removePlayer(remote) {
    const players = this.state.players.delete(remote);
    this.setState({players});
  }

  sendMessageTo(player, message) {
    console.log('Sending to', player, message);
    player.remote.send(message);
  }

  sendMessageToAll(message) {
    this.sendMessageToAllExcept(null, message);
  }

  sendMessageToAllExcept(exceptedPlayer, message) {
    this.state.players.forEach(player => {
      if (player !== exceptedPlayer) {
        this.sendMessageTo(player, message);
      }
    });
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

    this.sendMessageTo(drawer, {
        type: 'drawing',
        word,
    });

    this.sendMessageToAllExcept(drawer, {
        type: 'guessing',
    });

    this.setState({
      gameState: this.state.gameState
        .set('scoreRate', 100)
        .set('playerDrawing', drawer)
        .set('word', word)
    });
  }

  handleCorrectGuess(winner) {
    this.state.players.forEach(player => {
      if (player === winner) {

      } else {
        console.log('Sending word', this.state);
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
      return <PaintRoom drawer={gameState.playerDrawing} players={players.toList()} />;
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
