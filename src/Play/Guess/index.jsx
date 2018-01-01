import React, { Component } from 'react';

import StringDialog from 'components/StringDialog';

class Guess extends Component {
  sendGuess = (guess) => {
    console.log('Sending guess', guess);
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
            buttonText="Guess"
        />
      </div>
    );
  }
}

export default Guess;
