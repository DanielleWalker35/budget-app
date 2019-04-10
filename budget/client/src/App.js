import React, { Component } from 'react';
import './App.css';
import CreateBudget from './Budget/create-budget';

class App extends Component {
  render() {
    return (
      <div className="App">
      Budget
      <CreateBudget></CreateBudget>
      </div>
    );
  }
}

export default App;
