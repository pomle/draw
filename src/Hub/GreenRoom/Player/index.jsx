import React, { Component } from 'react';

class Player extends Component {
  render() {
    const {player} = this.props;

    return (
      <div className="Player">
        <div className="name">{player.name || 'Waiting'}</div>

        <div className="score">
            {player.score}
        </div>
      </div>
    );
  }
}

export default Player;
