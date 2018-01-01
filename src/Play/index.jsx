import React, { Component } from 'react';
import {Record} from 'immutable';
import {joinSession} from 'snex';

import Join from './Join';
import Guess from './Guess';
import Draw from './Draw';
import Wait from './Wait';

import './Play.css';

const PlayerState = Record({
  conn: null,
  ready: false,
  drawing: null,
  guessing: null,
});

class Play extends Component {
  constructor(props) {
    super(props);

    this.state = {
        busy: true,
        playerState: new PlayerState(),
        error: null,
    };
  }

  async componentDidMount() {
    try {
        const conn = await joinSession(this.props.sessionId);
        conn.on('data', data => {
          this.handleData(data);
        });

        this.setState({
          playerState: this.state.playerState.set('conn', conn),
        });
    } catch (error) {
        console.log(error);
        this.setState({error});
    }

    this.setState({busy: false});
  }

  handleData(data) {
    if (data.type === 'drawing') {
      this.setState({
        playerState: this.state.playerState
          .set('drawing', data.word)
          .delete('guessing'),
      });
    }

    if (data.type === 'guessing') {
      this.setState({
        playerState: this.state.playerState
          .set('guessing', true)
          .delete('drawing'),
      });
    }

    if (data.type === 'ready') {
      this.setState({
        playerState: this.state.playerState
          .set('ready', true)
      });
    }

    console.log('Player got data', data);
  }

  renderState() {
    const {busy, error, playerState} = this.state;

    if (busy) {
        return <Wait text="Connecting..."/>;
    }

    if (error) {
        return <div>
          <Wait text={error.message}/>

          <button onClick={this.props.cancel}>Retry</button>
        </div>;
    }

    if (playerState.drawing) {
        return <Draw word={playerState.drawing} conn={playerState.conn}/>;
    }

    if (playerState.guessing) {
        return <Guess conn={playerState.conn}/>;
    }

    if (!playerState.ready) {
        return <Join conn={playerState.conn}/>;
    }

    return <Wait text="Please wait..."/>;
  }

  render() {
    return (
      <div className="Play">
        { this.renderState() }
      </div>
    );
  }
}

export default Play;
