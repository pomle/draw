import React, { Component } from 'react';
import {createSensor} from 'snex';
import {createDrawer} from 'lib/draw.js';

import Fill from './Fill';
import surface from './draw.svg';

import './Draw.css';

class Draw extends Component {
  componentDidMount() {
    const context = this.canvas.getContext('2d');
    context.lineWidth = 3;

    this.draw = createDrawer(context);

    this.surface.addEventListener('load', () => {
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
      this.sensor.destroy();
  }

  render() {
    const {word} = this.props;

    return (
      <div className="Draw">
        <Fill aspect={800/450}>
          <object
            data={surface}
            type="image/svg+xml"
            ref={node => this.surface = node}>
          </object>

          <canvas width="800" height="450" ref={node => this.canvas = node}/>

          <h2 className="subjectCaption">Draw: {word}</h2>
        </Fill>
      </div>
    );
  }
}

export default Draw;
