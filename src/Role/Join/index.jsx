import React, { Component } from 'react';

import StringDialog from 'components/StringDialog';
import Play from '../../Play';

class Join extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionId: null,
    };
  }

  setSession = (sessionId) => {
    this.setState({
      sessionId: sessionId.toUpperCase(),
    });
  }

  render() {
    const {sessionId} = this.state;
    if (sessionId) {
      return <Play sessionId={sessionId}/>;
    }

    return <StringDialog
      caption="Session name"
      confirm={this.setSession}
    />;
  }
}

export default Join;
