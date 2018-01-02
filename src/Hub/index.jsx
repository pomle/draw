import React, { Component } from 'react';

import PaintRoom from './PaintRoom';
import GreenRoom from './GreenRoom';

import {startSession} from './connect';
import {GameState} from './state.js';

class Hub extends Component {
  constructor(props) {
    super(props);

    this.state = {
        game: new GameState(),
    };
  }

  async componentDidMount() {
    const session = await startSession(this.props.sessionId);

    session.on('connection', remote => {
      this.addPlayer(remote);

        remote.on('close', () => {
            //this.removePlayer(remote);
        });
    });

    this.setState({
      game: this.state.game.set('session', session)
    });
  }

  addPlayer(remote) {
    this.setState({
      game: this.state.game.addConnection(remote),
    });

    remote.on('data', async data => {
      console.log('Data', data);
      this.setState({
        game: await this.state.game.handleMessage(remote, data),
      });
    });
  }

  renderGameState() {
    const {game} = this.state;
    const drawer = game.players.current;
    const players = game.playerList;
    if (drawer) {
      return <PaintRoom drawer={drawer} players={players} />;
    } else {
      return <GreenRoom
        session={game.session}
        players={players}
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
