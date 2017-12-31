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

  render() {
    const {sessionId} = this.state;
    if (sessionId) {
      return <Hub sessionId={sessionId}/>;
    }

    return <StringDialog
      caption="Session name"
      default={this.randomId}
      confirm={(sessionId) => this.setState({sessionId})}
    />;
  }
}

export default Host;
