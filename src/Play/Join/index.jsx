import React, { Component } from 'react';

class Join extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  sendJoin = () => {
    this.props.conn.send({
      type: 'join',
      name: this.state.name,
    });
  }

  render() {
    return (
      <div className="Join">
        <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
        <button onClick={this.sendJoin}>Join</button>
      </div>
    );
  }
}

export default Join;
