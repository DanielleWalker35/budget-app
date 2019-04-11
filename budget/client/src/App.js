import React, { Component } from 'react';
import './App.css';
import CreateBudget from './Budget/create-budget';
import { getBudgets } from "./redux/budgetsRedux";
import { connect } from "react-redux";



class App extends Component {
  componentDidMount() {
    this.props.getBudgets();
  }

  render() {
    return (
      <div className="App">
        <CreateBudget></CreateBudget>
      </div>
    );
  }
}

export default (connect(null, { getBudgets })(App));
