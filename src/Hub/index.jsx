import React, { Component } from 'react';
import {Map, Record} from 'immutable';

import {createPeer, createSession} from 'snex';

import GreenRoom from './GreenRoom';

const Player = Record({
  score: 0,
  remote: null,
});

class Hub extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  addPlayer(remote) {
    const player = new Player({remote});
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
        <GreenRoom
          session={this.state.session}
          players={this.state.players.toList()}
        />
      </div>
    );
  }
}

export default Hub;
