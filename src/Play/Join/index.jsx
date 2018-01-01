import React, { Component } from 'react';

import StringDialog from 'components/StringDialog';
import {createRandomUsername} from './username.js';

class Join extends Component {
  sendJoin = (name) => {
    this.props.conn.send({
      type: 'join',
      name,
    });
  }

  render() {
    return (
      <div className="Join">
        <StringDialog
          caption="Pick a name"
          default={createRandomUsername()}
          confirm={this.sendJoin}
          buttonText="Join"
        />
      </div>
    );
  }
}

export default Join;
