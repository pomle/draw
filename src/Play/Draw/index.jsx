import React, { Component } from 'react';

import {createSensor} from 'snex';

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
    return (
      <div className="Draw">
        <object
          data={"/static/draw.svg"}
          type="image/svg+xml"
          ref={node => this.surface = node}>
        </object>
      </div>
    );
  }
}

export default Draw;
