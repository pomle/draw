import React, { Component } from 'react';

class StringDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.default || '',
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  confirm = () => {
    if (this.props.autoClear) {
      this.setState({
        value: '',
      });
    }

    this.props.confirm(this.state.value);
  }

  render() {
    return (
      <div className="StringDialog">
        <h2>{this.props.caption}</h2>

        <div className="name">
          <input type="text" autoFocus size="16" value={this.state.value} onChange={this.handleChange}/>
        </div>

        <div className="confirm">
          <button onClick={this.confirm} disabled={this.state.value.length === 0}>{this.props.buttonText || 'Go'}</button>
        </div>
      </div>
    );
  }
}

export default StringDialog;
