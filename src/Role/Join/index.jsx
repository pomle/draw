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
        caption="Session name"
        confirm={this.setSession}
      />

      <button onClick={this.props.cancel}>Back</button>
    </div>;
  }
}

export default Join;
