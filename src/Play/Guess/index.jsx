import React, { Component } from 'react';

class Guess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  handleText = (event) => {
    this.setState({
      text: event.target.value,
    });
  }

  sendGuess = () => {
    this.props.conn.send({
      type: 'guess',
      text: this.state.text,
    });
  }

  render() {

    return (
      <div className="Guess">
        <input type="text" value={this.state.text} onChange={this.handleText}/>
        <button onClick={this.sendGuess}>Guess</button>
      </div>
    );
  }
}

export default Guess;
