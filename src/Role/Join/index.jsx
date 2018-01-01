import React, { Component } from 'react';

import Push from 'components/Push';
import StringDialog from 'components/StringDialog';
import Play from '../../Play';

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
      this.next = <Play sessionId={sessionId} cancel={this.unset}/>;
    }

    const first = <div>
      <StringDialog
        caption="Join Session"
        confirm={this.setSession}
      />

      <button onClick={this.props.cancel}>Back</button>
    </div>;

    return <Push left={first} right={this.next} next={sessionId}/>;
  }
}

export default Join;
