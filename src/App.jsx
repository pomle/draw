import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Hub from './Hub';
import Play from './Play';


import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Route exact path="/host/:id?" component={Hub}/>
            <Route path="/:id" component={Play}/>
        </div>
      </Router>
    );
  }
}

export default App;
