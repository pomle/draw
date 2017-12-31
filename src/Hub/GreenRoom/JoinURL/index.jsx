import React, { Component } from 'react';

class JoinURL extends Component {
  render() {
    const {session} = this.props;

    const url = `#/${session.id}`;
    return (
      <div className="JoinURL">
        <div>
            Join the game at:
        </div>
        <div>
            <a href={url}>{url}</a>
        </div>
      </div>
    );
  }
}

export default JoinURL;
