import React, { Component } from 'react';

import StringDialog from 'components/StringDialog';
import Play from '../../Play';

const FIXTURES = [
  [
    'Happy',
    'Trippy',
    'Cute',
    'Fancy',
    'Rowdy',
  ],
  [
    'Tiger',
    'Hippo',
    'Snek',
    'Doodler',
    'Spy',
  ],
];

function rand(array) {
  const index = Math.random() * array.length | 0;
  return array[index];
}

function createRandomUsername() {
  return rand(FIXTURES[0]) + rand(FIXTURES[1]);
}

class Join extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionId: null,
    };
  }

  unset = () => {
    this.setState({
      sessionId: null,
    });
  }

  setSession = (sessionId) => {
    this.setState({
      sessionId: sessionId.toUpperCase(),
    });
  }

  render() {
    const {sessionId} = this.state;
    if (sessionId) {
      return <Play sessionId={sessionId} cancel={this.unset}/>;
    }

    return <div>
      <StringDialog
        caption="Join Session"
        default={createRandomUsername()}
        confirm={this.setSession}
      />

      <button onClick={this.props.cancel}>Back</button>
    </div>;
  }
}

export default Join;
