import React, { Component } from 'react';

class Wait extends Component {
  render() {
    return (
      <div className="Wait">
        {this.props.text}
      </div>
    );
  }
}

export default Wait;
