import React, { Component } from 'react';

import {createDrawer} from 'lib/draw.js';

class Canvas extends Component {
  componentDidMount() {
    const context = this.canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.draw = createDrawer(context);

    this.props.player.remote.on('data', this.handleData);

    this.drawHistory = [];
  }

  componentWillUnmount() {
    this.props.player.remote.off('data', this.handleData);
  }

  handleData = (data) => {
    if (data.type === 'draw') {
      this.drawHistory.push(data.draw.state);
      this.draw(data.draw.state);
    }
  }

  render() {
    const {player} = this.props;

    return (
      <div className="Canvas">
        <div className="playingPlayer">{player.name}</div>

        <canvas width="800" height="450" ref={canvas => this.canvas = canvas}/>
      </div>
    );
  }
}

export default Canvas;
