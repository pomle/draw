import React, { Component } from 'react';

import './Push.css';

class Push extends Component {
  render() {
    let x = this.props.next ? -1 : 0;
    console.log('Show next', this.props.next, x);

    return (
      <div className="Push">
        <div className="left" style={{transform: `translateX(${100 * x++}%)`}}>
          {this.props.left}
        </div>
        <div className="right" style={{transform: `translateX(${100 * x++}%)`}}>
          {this.props.right}
        </div>
      </div>
    );
  }
}

export default Push;
