import React, { Component } from 'react';
import { connect } from "react-redux";
import { getBudgetInfo } from "../redux/budgetsRedux";
import { addTransaction, getTransactions } from "../redux/transactionsRedux";
import { Link } from "react-router-dom";
import Table from './table';

class Budget extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                transactionName: "",
                amount: "",
                type: "",
                budget: this.props.match.params.budgetId || ""
            }
        }
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { budgetId } = this.props.match.params;
        this.props.getBudgetInfo(budgetId);
        this.props.getTransactions(budgetId);

    }
    handleChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addTransaction(this.state.inputs);
        this.setState(this.initialState)
    }

    render() {
        const { name, description } = this.props.budgets.info;
        const { transactionName, amount, type } = this.state.inputs;

        return (
            <div className="budgetWrapper">
                <div>
                    <div className="budgetName">{name}</div>
                    <div className="budgetDescription">{description}</div>
                </div>
                <h2>Add a new Transaction</h2>
                <form onSubmit={this.handleSubmit} >
                    <input onChange={this.handleChange} name="transactionName" value={transactionName} placeholder="Transaction Name" type="text" />
                    <input onChange={this.handleChange} name="amount" value={amount} placeholder="Amount" type="number" />
                    <select name="type" value={type} onChange={this.handleChange}>
                        <option value="">Select a Type</option>
                        <option value="home">Home</option>
                        <option value="food">Food</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="car">Car</option>
                    </select>
                    <button className="add-transaction-button">Add Transaction</button>
                </form>
                <Table {...this.props} ></Table>
                <Link to="/"><button className="back-button">Back</button></Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state;
}
export default connect(mapStateToProps, { getBudgetInfo, addTransaction, getTransactions })(Budget);

