    
import React, { Component } from 'react';
import { connect } from "react-redux";
import { addBudget, editBudget, deleteBudget } from "../redux/budgetsRedux";
import BudgetsList from './budgetsList';



class CreateBudget extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: "",
                description: "",
            }
        }
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
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
        this.props.addBudget(this.state.inputs);
        this.setState(this.initialState)
    }


    render() {
        const { loading, errMsg } = this.props;
        if (loading) {
            return (
                <div className="loading">...Loading</div>
            )
        } else if (errMsg) {
            return (
                <div>{errMsg}</div>
            )
        } else {
            const { name, description } = this.state.inputs;
            const budgetsList = this.props.budgetData.map(budget => <BudgetsList key={budget._id} {...budget} />)

            return (
                <div className="budgetInputs">
                    <h1 className="budgetTitle">Budgets</h1>
                    <h2>Create a New Budget</h2>
                    <form className="inputForm" onSubmit={this.handleSubmit} >
                        <input onChange={this.handleChange} name="name" value={name} placeholder="Budget Name" type="text" />
                        <input onChange={this.handleChange} name="description" value={description} placeholder="Description" type="text" />
                        <button className="submitButton">Create Budget</button>
                    </form>
                    <h2>Choose an exsisting budget:</h2>
                    <div className="budgetList">
                        {budgetsList}
                    </div>
                </div>
            )
        }
    }
}
const mapStateToProps = state => {
    return state.budgets;
}
export default connect(mapStateToProps, { addBudget, editBudget, deleteBudget })(CreateBudget);

