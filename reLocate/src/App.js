import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to ReLocate</h2>
        </div>
        <p className="App-intro">
          Come. Change your Life. Re-Locate!!!!!
        </p>
        <button><a href="./SecondPg">SecondPg</a></button>
      </div>
    );
  }
}

export default App;

// To get started, edit <code>src/App.js</code> and save to reload.