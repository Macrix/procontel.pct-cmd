import React from 'react';
import './App.css';
import { Orders } from './components';
import logo from './logo.svg';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Orders />
      </header>
    </div>
  );
}

export default App;
