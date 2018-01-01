import React, { Component } from 'react';

import StringDialog from 'components/StringDialog';

class Guess extends Component {
  sendGuess = (guess) => {
    this.props.conn.send({
        type: 'guess',
        guess,
    });
  }

  render() {
    return (
      <div className="Guess">
        <StringDialog
            caption="Guess the Sketch"
            confirm={this.sendJoin}
            buttonText="Guess"
        />
      </div>
    );
  }
}

export default Guess;
