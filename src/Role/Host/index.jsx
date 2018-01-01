import React, { Component } from 'react';

import StringDialog from 'components/StringDialog';
import Hub from '../../Hub';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function createRandomId(size) {
  const chars = [];
  for (let i = 0; i < size; i++) {
    chars.push(LETTERS[Math.random() * LETTERS.length | 0]);
  }
  return chars.join('');
}

class Host extends Component {
  constructor(props) {
    super(props);

    this.randomId = createRandomId(4);

    this.state = {
      sessionId: null,
    };
  }

  restart = () => {
    this.setState({
      sessionId: null,
    });
  }

  render() {
    const {sessionId} = this.state;
    if (sessionId) {
      return <div>
        <Hub sessionId={sessionId} />

        <button onClick={this.restart}>Restart</button>
      </div>;
    }

    return <div>
      <StringDialog
        caption="Create Session"
        default={this.randomId}
        confirm={(sessionId) => this.setState({sessionId})}
        buttonText="Create"
      />

      <button onClick={this.props.cancel}>Back</button>
    </div>;
  }
}

export default Host;
