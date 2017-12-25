import React, { Component } from 'react';

import {createDrawer} from './draw.js';

class Canvas extends Component {
  componentDidMount() {
    const {player} = this.props;

    this.draw = createDrawer(this.canvas.getContext('2d'));

    player.remote.on('data', data => {
      this.handleData(data);
    });
  }

  handleData(data) {
    if (data.type === 'draw') {
      this.draw(data.draw.state);
    }
  }

  render() {
    const {player} = this.props;
    return (
      <div className="Canvas">
        <div className="playingPlayer">{player.name}</div>

        <canvas width="800" height="600" ref={canvas => this.canvas = canvas}/>
      </div>
    );
  }
}

export default Canvas;
