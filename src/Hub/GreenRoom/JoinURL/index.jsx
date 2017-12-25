import React, { Component } from 'react';

class JoinURL extends Component {
  render() {
    const {session} = this.props;

    const url = `/play/${session.id}`;
    return (
      <div className="JoinURL">
        <a href={url}>{url}</a>
      </div>
    );
  }
}

export default JoinURL;
