import React, { Component } from 'react';
import {Record} from 'immutable';
import {joinSession} from 'snex';

import Join from './Join';
import Assess from './Assess';
import Draw from './Draw';
import Wait from './Wait';

import './Play.css';

const PlayerState = Record({
  conn: null,
  ready: false,
  drawing: null,
  assessing: null,
});

class Play extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busy: true,
    };

    this.sessionId = null;
  }

  componentDidMount() {
      this.handleProps(this.props);
  }

  componentWillReceiveProps(props) {
      this.handleProps(props);
  }

  async handleProps(props) {
    if (this.sessionId === props.sessionId) {
      return;
    }

    this.sessionId = props.sessionId;

    this.setState({
        busy: true,
        playerState: new PlayerState(),
        error: null,
    });

    try {
        const conn = await joinSession(props.sessionId);
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
        playerState: this.state.playerState.set('drawing', data.word)
      });
    }

    if (data.type === 'assess') {
      this.setState({
        playerState: this.state.playerState.set('assess', data.word)
      });
    }

    if (data.type === 'ready') {
      this.setState({
        playerState: this.state.playerState.set('ready', true)
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

    if (playerState.assessing) {
        return <Assess answer={playerState.assessing} conn={playerState.conn}/>;
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
