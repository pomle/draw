import React, { Component } from 'react';

import {createSensor} from 'snex';

import surface from './draw.svg';

class Draw extends Component {
  componentDidMount() {
    this.surface.addEventListener('load', () => {
      console.log('Ready');
      this.sensor = createSensor(this.surface);

      this.sensor.listen(data => {
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
        <div className="subject">
          Draw the word: {word}
        </div>

        <object
          data={surface}
          type="image/svg+xml"
          ref={node => this.surface = node}>
        </object>
      </div>
    );
  }
}

export default Draw;
