import React, { Component } from 'react';

import './PlayerCount.css';

class PlayerCount extends Component {
  render() {
    const {players} = this.props;

    const style = {
        transform: [
            `rotate(${Math.sin(players.size * 2) * 15}deg)`,
            `scale(${1 + players.size / 20})`,
        ].join(' '),
    };

    return (
        <div className="PlayerCount" style={style}>
          <div className="number">
            {players.size}
          </div>
          <div className="text">
            players
          </div>
        </div>
    );
  }
}

export default PlayerCount;

