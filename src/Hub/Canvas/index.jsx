import React, { Component } from 'react';

import {createDrawer} from 'lib/draw.js';

import './Canvas.css';

class Canvas extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.active && !this.props.active) {
      const context = this.canvas.getContext('2d');
      context.clearRect(0, 0,
        this.canvas.width,
        this.canvas.height);
    }
  }

  componentDidMount() {
    const context = this.canvas.getContext('2d');
    context.lineWidth = 3;

    this.draw = createDrawer(context);

    this.props.player.remote.on('data', this.handleData);
  }

  componentWillUnmount() {
    this.props.player.remote.off('data', this.handleData);
  }

  handleData = (data) => {
    if (data.type === 'draw') {
      this.draw(data.draw);
    }
  }

  render() {
    const {player} = this.props;
    console.log('Player', player);

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
