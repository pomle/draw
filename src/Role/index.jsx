import React, { Component } from 'react';

import Push from 'components/Push';

import Host from './Host';
import Join from './Join';

const ROLE_HOST = 'hub';
const ROLE_JOIN = 'play';

class Role extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: null,
    };
  }

  restore = () => {
    this.setState({
      role: null,
    });
  }

  render() {
    const {role} = this.state;

    if (role === ROLE_HOST) {
      this.next = <Host cancel={this.restore} />;
    } else if (role === ROLE_JOIN) {
      this.next = <Join cancel={this.restore} />;
    }

    const first = <div>
      <h2>Draw!</h2>

      <button onClick={() => this.setState({role: ROLE_HOST})}>Host</button>
      <button onClick={() => this.setState({role: ROLE_JOIN})}>Join</button>
    </div>;

    return <Push left={first} right={this.next} next={!!role}/>;
  }
}

export default Role;
