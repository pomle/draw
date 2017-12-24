import React, { Component } from 'react';

import {createDrawer} from './draw.js';

class Canvas extends Component {
  componentDidMount() {
    this.draw = createDrawer(this.canvas.getContext('2d'));

    this.props.remote.on('data', data => {
      this.handleData(data);
    });
  }

  handleData(data) {
    if (data.type === 'draw') {
      this.draw(data.draw.state);
    }
  }

  render() {
    return (
      <div className="Canvas">
        <canvas width="800" height="600" ref={canvas => this.canvas = canvas}/>
      </div>
    );
  }
}

export default Canvas;
