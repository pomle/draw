import React, { Component } from 'react';

class JoinURL extends Component {
  render() {
    const {session} = this.props;

    return (
      <div className="JoinURL">
        <div>
            Join the game at
            <div className="session-id">{session.id}</div>
        </div>
      </div>
    );
  }
}

export default JoinURL;
