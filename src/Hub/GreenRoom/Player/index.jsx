import React, { Component } from 'react';

import Canvas from '../../../Canvas';

class Player extends Component {
  render() {
    return (
      <div className="Player">
        <Canvas remote={this.props.player.remote} />
      </div>
    );
  }
}

export default Player;
