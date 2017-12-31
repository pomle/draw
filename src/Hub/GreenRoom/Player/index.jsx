import React, { Component } from 'react';

class Player extends Component {
  render() {
    const {player} = this.props;

    return (
      <div className="Player">
        <div className="state">{player.ready ? 'Ready' : 'Waiting for name'}</div>
        <div className="name">{player.name}</div>
      </div>
    );
  }
}

export default Player;
