import React, { Component } from 'react';
import {joinSession} from 'snex';

import Draw from './Draw';

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
        conn.on('data', data => {
          this.handleData(data);
        });

        this.setState({conn});
    } catch (error) {
        console.log(error);
        this.setState({error});
    }

    this.setState({busy: false});
  }

  handleData(data) {
    console.log('Player got data', data);
  }

  render() {

    return (
      <div className="Play">
        <div className="busy">
            {this.state.busy ? "Please wait" : "Done"}
        </div>

        { this.state.conn
            ? <Draw conn={this.state.conn} />
            : null
        }

        <div className="error">
            {this.state.error && this.state.error.message}
        </div>
      </div>
    );
  }
}

export default Play;
