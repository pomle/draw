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
        <h2>Pick a name</h2>

        <div className="name">
          <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
        </div>

        <div className="confirm">
          <button onClick={this.sendJoin}>Join</button>
        </div>
      </div>
    );
  }
}

export default Join;
