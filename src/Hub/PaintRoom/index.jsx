import React, { Component } from 'react';

import Canvas from '../Canvas';

class PaintRoom extends Component {
  render() {
    const {drawer, players} = this.props;

    return (
      <div className="PaintRoom">
        { players.map(player => {
          const active = player === drawer;
          const id = player.remote.id;
          return <div key={id} className="player" style={{display: active ? null : 'none'}}>
            <Canvas player={player} active={active} />
          </div>;
        }) }
      </div>
    );
  }
}

export default PaintRoom;
