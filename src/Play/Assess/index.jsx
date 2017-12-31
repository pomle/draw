import React, { Component } from 'react';

class Assess extends Component {
  render() {
    return (
      <div className="Assess">

        <div className="word">
          {this.props.answer}
        </div>
      </div>
    );
  }
}

export default Assess;
