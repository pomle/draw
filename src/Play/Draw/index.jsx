import React, { Component } from 'react';
import {createSensor} from 'snex';
import {createDrawer} from 'lib/draw.js';

import Fill from './Fill';
import surface from './draw.svg';

import './Draw.css';

class Draw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawing: false,
    };
  }

  componentDidMount() {
    const context = this.canvas.getContext('2d');
    context.lineWidth = 3;

    this.draw = createDrawer(context);

    this.surface.addEventListener('load', () => {
      this.surface.contentDocument.addEventListener('touchstart', this.touch);
      this.surface.contentDocument.addEventListener('touchend', this.release);

      this.sensor = createSensor(this.surface);

      this.sensor.listen(data => {
        this.draw(data.state);

        console.log("Sending", data);
        this.props.conn.send({
          type: 'draw',
          draw: data,
        });
      });
    });
  }

  componentWillUnmount() {
      this.surface.contentDocument.removeEventListener('touchstart', this.touch);
      this.surface.contentDocument.removeEventListener('touchend', this.release);
      this.sensor.destroy();
  }

  touch = () => {
    console.log('touch');
    this.setState({
      isDrawing: true,
    });
  }

  release = () => {
    this.setState({
      isDrawing: false,
    });
  }

  clear = () => {
    this.props.conn.send({
      type: 'clear',
    });
  }

  render() {
    const {word} = this.props;
    const {isDrawing} = this.state;

    const hide =  {
      display: isDrawing ? 'none' : null,
    };

    return (
      <div className="Draw">
        <div className="controls" style={hide}>
          <button>Clear</button>
        </div>

        <Fill aspect={800/450}>
          <object
            data={surface}
            type="image/svg+xml"
            ref={node => this.surface = node}>
          </object>

          <canvas width="800" height="450" ref={node => this.canvas = node}/>

          <h2 className="subjectCaption" style={hide}>Draw: {word}</h2>
        </Fill>
      </div>
    );
  }
}

export default Draw;
