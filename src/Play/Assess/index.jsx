import React, { Component } from 'react';

class Assess extends Component {
  render() {
    return (
      <div className="Assess">

        <div className="answer">
          {this.prop.answer}
        </div>
      </div>
    );
  }
}

export default Assess;
