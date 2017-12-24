import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Hub from './Hub';
import Play from './Play';


import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Route exact path="/" component={Hub}/>
            <Route path="/play/:id" component={Play}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
