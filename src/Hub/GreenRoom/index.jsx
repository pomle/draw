import React, { Component } from 'react';

import JoinURL from './JoinURL';
import Player from './Player';
import PlayerCount from './PlayerCount';

import './GreenRoom.css';

class GreenRoom extends Component {
  render() {
    const {session, players} = this.props;

    return (
      <div className="GreenRoom">
        <h2>Welcome to the Lobby</h2>

        { session
          ? <JoinURL session={session}/>
          : null
        }

        <PlayerCount players={players} />

        <ul className="players">
            { players.map(player => {
                return <li key={player.remote.id}>
                    <Player player={player}/>
                </li>;
            }) }
        </ul>
      </div>
    );
  }
}

export default GreenRoom;
