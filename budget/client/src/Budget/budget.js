import React, { Component } from 'react'

class Budget extends Component {
    //add state with showModal: false,
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                title: this.props.name || "",
                description: this.props.description || "",
            },
            showModal: false
        }
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.props.editBudget(this.state.inputs, this.props._id);
    }

    render() {
        const { name, description } = this.state.inputs;

        return (
            <div className="BudgetWrapper">
                <div className="BudgetName">
                    <h2>{this.props.name}</h2>
                    <p className="budgetDescription">{this.props.description}</p>
                    <button className="editButton">Edit</button>
                </div>
                <button onClick={() => this.props.deleteBudget(this.props._id)} className="deleteButton"></button>
                    <div className="boxForModal">
                        <h1>Edit:</h1>
                        <form className="editForm" onSubmit={this.handleSubmit}>
                            <input onChange={this.handleChange} name="name" value={name} placeholder="Budget Name" type="text" />
                            <input onChange={this.handleChange} name="description" value={description} placeholder="Description" type="text" />
                            <button className="saveButton">Save Changes</button>
                        </form>
                    </div>
                </div>
        )
    }
}
export default Budget;