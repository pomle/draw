import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Hub from './Hub';
import Play from './Play';

import './App.css';

function BeHost() {
    return <Redirect to="/host"/>;
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={BeHost}/>
            <Route path="/host/:id?" component={Hub}/>
            <Route path="/:id" component={Play}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
