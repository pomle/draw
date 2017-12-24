import React, { Component } from 'react';

import Canvas from '../../Canvas';

class Player extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="Player">
        <Canvas/>
      </div>
    );
  }
}

export default Player;
