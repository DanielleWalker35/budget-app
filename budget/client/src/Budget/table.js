
import React, { Component } from 'react';
import { connect } from "react-redux";
import { editTransaction, deleteTransaction } from "../redux/transactionsRedux";



class Table extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: "",
                amount: "",
                type: "",
                budget: ""
            },
            search: "",
            filter: ""
        }
        this.state = this.initialState;
    }

    handleTypeChange = id => (event) => {
        const { value } = event.target;
        const typeObj = {
            type: value
        }
        this.props.editTransaction(typeObj, id);
    }

    searchChange = (event) => {
        this.setState({ search: event.target.value })
    }
    filterChange = (event) => {
        this.setState({ filter: event.target.value })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.inputs)
        return header.map((key, index) => {
            if (key !== "budget") {
                return <th key={index}>{key.toUpperCase()}</th>
            } else {
                return <th key={index}>DELETE</th>
            }
        })
    }

    renderTableData(dataArray) {
        return dataArray.map((transaction, index) => {
            const { _id, transactionName, amount, type } = transaction //destructuring
            return (
                <tr key={_id}>
                    <td>{transactionName}</td>
                    <td>{amount}</td>
                    <td>
                        <select name="type" value={type} onChange={this.handleTypeChange(_id)}>
                            <option value="home">Home</option>
                            <option value="food">Food</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="car">Car</option>
                        </select>
                    </td>
                    <td>
                        <button onClick={() => this.props.deleteTransaction(_id)} className="deleteButton">Delete</button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        let filteredTransactions = this.props.transactions.transactionData.filter(transaction => transaction.transactionName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1).filter(transaction => transaction.type.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1);
        return (
            <div>
                <h1 id='title'>Transactions</h1>
                <div className="filter-search">
                    <input className="search" type="text" placeholder="Search..." value={this.state.search} onChange={this.searchChange} />
                    <div className="filter">
                        <h4 className="filter-type" >Filter by Type:</h4>
                        <select className="dropdown" name="type" value={this.state.filter} onChange={this.filterChange}>
                            <option value="">Clear Filter</option>
                            <option value="home">Home</option>
                            <option value="food">Food</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="car">Car</option>
                        </select>
                    </div>
                </div>
                <table id='transactions'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData(filteredTransactions)}
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return state.transactions;
}
export default connect(mapStateToProps, { editTransaction, deleteTransaction })(Table);

