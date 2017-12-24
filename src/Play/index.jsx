import React, { Component } from 'react';

import {createSensor, joinSession} from 'snex';

class Play extends Component {
  constructor(props) {
    super(props);

    this.state = {
        busy: true,
        conn: null,
        error: null,
    }
  }

  async componentDidMount() {
    try {
        const conn = await joinSession(this.props.match.params.id);

        const sensor = createSensor(this.surface);

        sensor.listen(data => {
            console.log("Sending", data);
            conn.send(data);
        });

        conn.on('data', function(data) {
            console.info('Remote Received', data);
        });

        this.setState({conn})
    } catch (error) {
        console.log(error);
        this.setState({error});
    }

    this.setState({busy: false});
  }

  render() {

    return (
      <div className="Play">
        <div className="busy">
            {this.state.busy ? "Please wait" : "Done"}
        </div>

        <object
          data="/surface/draw.svg"
          type="image/svg+xml"
          ref={node => this.surface = node}>
        </object>

        <div className="error">
            {this.state.error && this.state.error.message}
        </div>
      </div>
    );
  }
}

export default Play;
