import React, { Component } from 'react';

import StringDialog from 'components/StringDialog';

function createReco(onMatch, onEnd) {
  const reco = new window.webkitSpeechRecognition();
  reco.continuous = true;
  reco.interimResults = true;

  reco.onstart = () => {
    console.log('Start');
  };

  reco.onerror = (event) => {
    console.error(event);
  };

  reco.onend = () => {
    console.log('End');
    onEnd();
  };

  reco.onresult = (event) => {
    console.log(event);

    const candidates = [...event.results[0]];
    const candidate = candidates.find(candidate => candidate.confidence > 0.8);

    if (candidate) {
      onMatch(candidate.transcript);
      reco.stop();
    }
  };

  reco.lang = 'en-US';
  reco.start();
}

class Guess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listening: false,
    };

    const listen = () => {
      createReco(guess => {
        this.setState({guess});
        this.sendGuess(guess);
      }, listen);
    }

    listen();
  }

  sendGuess = (guess) => {
    console.log('Sending guess', guess);
    if (!this.props.conn) {
      return;
    }

    this.props.conn.send({
        type: 'guess',
        guess,
    });
  }

  render() {
    return (
      <div className="Guess">
        <StringDialog
            autoClear
            caption="Guess the Sketch"
            confirm={this.sendGuess}
            value={this.state.guess}
            buttonText="Guess"
        />
      </div>
    );
  }
}

export default Guess;
