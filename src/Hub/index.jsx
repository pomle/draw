import React, { Component } from 'react';
import {Map} from 'immutable';

import {createPeer, createSession} from 'snex';

import Player from './Player';

class Hub extends Component {
  constructor(props) {
    super(props);

    this.state = {
        url: null,
        players: new Map(),
    };
  }

  async componentDidMount() {
    const peer = createPeer();
    const session = await createSession(peer);
    const url = `/play/${session.id}`;
    this.setState({url});

    session.on('connection', remote => {
        this.addPlayer(remote);

        remote.on('close', () => {
            this.removePlayer(remote);
        });
    });
  }

  addPlayer(remote) {
    const player = <Player remote={remote}/>;
    const players = this.state.players.set(remote, player);
    this.setState({players});
  }

  removePlayer(remote) {
    const players = this.state.players.delete(remote);
    this.setState({players});
  }

  render() {
    return (
      <div className="Hub">
        <div><a href={this.state.url}>{this.state.url}</a></div>

        <div className="playerCount">
            {this.state.players.size}
        </div>

        <ul className="Players">
            { [...this.state.players].map(([remote, element]) => {
                return <li key={remote.id}>{element}</li>
            }) }
        </ul>
      </div>
    );
  }
}

export default Hub;
