import React, { Component } from 'react';

class JoinURL extends Component {
  render() {
    const {session} = this.props;

    return (
      <div className="JoinURL">
        <div>
            Join the game at {session.id}
        </div>
      </div>
    );
  }
}

export default JoinURL;
