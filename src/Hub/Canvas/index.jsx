import React, { Component } from 'react';

import {createDrawer} from 'lib/draw.js';

import './Canvas.css';

class Canvas extends Component {
  componentDidMount() {
    const context = this.canvas.getContext('2d');
    context.lineWidth = 3;

    this.draw = createDrawer(context);

    this.props.player.remote.on('data', this.handleData);

    this.drawHistory = [];
  }

  componentWillUnmount() {
    this.props.player.remote.off('data', this.handleData);
  }

  handleData = (data) => {
    if (data.type === 'draw') {
      this.drawHistory.push(data.draw);
      this.draw(data.draw);
    }
  }

  render() {
    const {player} = this.props;

    return (
      <div className="Canvas">
        <div>
          <h2 className="playingPlayer">{player.name} is drawing</h2>
        </div>

        <div className="drawingArea">
          <canvas width="800" height="450" ref={canvas => this.canvas = canvas}/>
        </div>
      </div>
    );
  }
}

export default Canvas;
