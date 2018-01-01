import React, { Component } from 'react';

import Surface from './Surface';

class Draw extends Component {

  render() {
    return <Surface conn={this.props.conn} word={this.props.word}/>;
  }
}

export default Draw;
