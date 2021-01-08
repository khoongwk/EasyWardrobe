import React, { Component } from 'react';
import './App.css';
import tachyons from 'tachyons';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';

class App extends Component {
  render() {
    return (
      <Login />,
      <Home />
    );
  }
}

export default App;
