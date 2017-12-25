import React, { Component } from 'react';
import {Map, Record} from 'immutable';

import {createPeer, createSession} from 'snex';

import GreenRoom from './GreenRoom';

const Player = Record({
  score: 0,
  ready: false,
  name: null,
  remote: null,
});

const GameState = Record({
  playerDrawing: null,
});

class Hub extends Component {
  constructor(props) {
    super(props);

    this.state = {
        gameState: new GameState(),
        session: null,
        players: new Map(),
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
    console.log(Player, data);

    if (data.type === 'join') {
      return this.updatePlayer(player.remote,
        player.set('name', data.name).set('ready', true));
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

  renderGameState() {
    const {gameState, session, players} = this.state;
    if (gameState.playerDrawing) {
      return null;
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
