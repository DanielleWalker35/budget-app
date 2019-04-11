import React, { Component } from 'react';
import { connect } from "react-redux";
import { editBudget, deleteBudget, getBudgetInfo } from "../redux/budgetsRedux";

class Budget extends Component {
    //add state with showModal: false,
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: this.props.name || "",
                description: this.props.description || "",
            },
            showModal: false
        }
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { budgetId } = this.props.match.params;
        this.props.getBudgetInfo(budgetId);

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
        // const { name, description } = this.state.inputs;
        const { name, description } = this.props.info;

        return (
            <div className="BudgetWrapper">
                <div className="BudgetName">
                    <h2>{name}</h2>
                    <p className="budgetDescription">{description}</p>
                    {/* <button className="editButton">Edit</button> */}
                </div>
                <button onClick={() => this.props.deleteBudget(this.props._id)} className="deleteButton"></button>
                    <div className="boxForModal">
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

const mapStateToProps = state => {
    return state.budgets;
}
export default connect(mapStateToProps, { editBudget, deleteBudget, getBudgetInfo })(Budget);

