import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class SecondPg extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>This is Second Page</h2>
        </div>
        <p className="App-intro">
          Whats Up Jimmie!!!!!
        </p>
      </div>
    );
  }
}

export default SecondPg;