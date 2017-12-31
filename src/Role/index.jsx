import React, { Component } from 'react';

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

  render() {
    const {role} = this.state;
    if (role === ROLE_HOST) {
      return <Host/>;
    } else if (role === ROLE_JOIN) {
      return <Join/>;
    }

    return (
      <div>
        <h2>Draw!</h2>

        <button onClick={() => this.setState({role: ROLE_HOST})}>Host</button>
        <button onClick={() => this.setState({role: ROLE_JOIN})}>Join</button>
      </div>
    );
  }
}

export default Role;
