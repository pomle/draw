import React, { Component } from 'react';
import {joinSession} from 'snex';

import Join from './Join';
import Guess from './Guess';
import Draw from './Draw';
import Wait from './Wait';

export const STATE_JOIN = 'join';
export const STATE_DRAW = 'draw';
export const STATE_GUESS = 'guess';

class Play extends Component {
  constructor(props) {
    super(props);

    this.state = {
        busy: true,
        conn: null,
        gameState: null,
        error: null,
    };
  }

  async componentDidMount() {
    try {
        const conn = await joinSession(this.props.match.params.id);
        conn.on('data', data => {
          this.handleData(data);
        });

        this.setState({
          gameState: STATE_JOIN,
          conn
        });
    } catch (error) {
        console.log(error);
        this.setState({error});
    }

    this.setState({busy: false});
  }

  handleData(data) {
    if (data.type === 'state-change') {
      this.setState({gameState: data.state});
    }
    console.log('Player got data', data);
  }

  renderState() {
    const {conn} = this.state;

    switch (this.state.gameState) {
      case STATE_JOIN:
        return <Join conn={conn}/>;
      case STATE_GUESS:
        return <Guess conn={conn}/>;
      case STATE_DRAW:
        return <Draw conn={conn}/>;
      default:
        return <Wait text="Please wait..."/>;
    }
  }

  render() {
    return (
      <div className="Play">
        { this.renderState() }

        <div className="error">
            {this.state.error && this.state.error.message}
        </div>
      </div>
    );
  }
}

export default Play;
