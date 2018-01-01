import React, { Component } from 'react';

import Push from 'components/Push';
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
      this.next = <div>
        <Hub sessionId={sessionId} />

        <button onClick={this.restart}>Restart</button>
      </div>;
    }

    const first = <div>
      <StringDialog
        caption="Create Session"
        default={this.randomId}
        confirm={(sessionId) => this.setState({sessionId})}
      />

      <button onClick={this.props.cancel}>Back</button>
    </div>;

    return <Push left={first} right={this.next} next={sessionId}/>;
  }
}

export default Host;
