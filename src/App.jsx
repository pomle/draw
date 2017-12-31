import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Hub from './Hub';
import Play from './Play';


import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/pictionary" >
        <div className="App">
            <Route path="/play/:id" component={Play}/>
            <Route exact path="/:id?" component={Hub}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
