import React, { Component } from 'react';

import './Push.css';

class Push extends Component {
  render() {
    const index = this.props.next ? -1 : 0;

    return (
      <div className="Push">
        <div className="items" style={{transform: `translateX(${50 * index}%)`}}>
          <div className="left">
            {this.props.left}
          </div>
          <div className="right">
            {this.props.right}
          </div>
        </div>
      </div>
    );
  }
}

export default Push;
