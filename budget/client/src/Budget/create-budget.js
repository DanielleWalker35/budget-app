    
import React, { Component } from 'react';
import { connect } from "react-redux";


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
        this.setState(this.initialState)
    }


    render() {
        // const { loading, errMsg } = this.props;
        // if (loading) {
        //     return (
        //         <div className="loading">...Loading</div>
        //     )
        // } else if (errMsg) {
        //     return (
        //         <div>{errMsg}</div>
        //     )
        // } else {
            const { name, description } = this.state.inputs;
            return (
                <div className="budgetInputs">
                    <h1 className="budgetTitle">Budgets</h1>
                    <form className="inputForm" onSubmit={this.handleSubmit} >
                        <input onChange={this.handleChange} name="name" value={name} placeholder="Budget Name" type="text" />
                        <input onChange={this.handleChange} name="description" value={description} placeholder="Description" type="text" />
                        <button className="submitButton">Submit</button>
                    </form>
                    <div className="budgetList">
                        List my budgets here
                    </div>
                </div>
            )
        }
    }
// }
const mapStateToProps = state => {
    return state.budgets;
}
export default connect(mapStateToProps, {})(CreateBudget);

