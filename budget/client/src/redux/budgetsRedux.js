import axios from 'axios';

const initialState = {
    budgetData: [],
    info: {},
    loading: true,
    errMsg: ""
}

// this.state = this.initialState;
const budgetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_BUDGETS":
            return {
                ...state,
                loading: false,
                budgetData: action.data
            }
        case "GET_BUDGET_INFO":
            return {
                ...state,
                info: action.info,
                loading: false,
            }
        case "ADD_BUDGET":
            return {
                ...state,
                loading: false,
                budgetData: [...state.budgetData, action.newBudget]
            }
        case "EDIT_BUDGET":
            return {
                ...state,
                loading: false,
                budgetData: state.budgetData.map(budget => {
                    if (budget._id === action.id) {
                        return action.editedBudget
                    } else {
                        return budget
                    }
                })
            }
        case "DELETE_BUDGET":
            return {
                ...state,
                loading: false,
                budgetData: state.budgetData.filter(budget => budget._id !== action.id)
            }
        default:
            return state;
    }
}
export const getBudgets = () => {
    return dispatch => {
        axios.get("/api/budgets")
            .then(response => {
                dispatch({
                    type: "GET_BUDGETS",
                    data: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry no data available"

                })
            })
    }
}

export const getBudgetInfo = (budgetId) => {
    return dispatch => {
        dispatch({
            type: "LOADING",
        });
        axios.get("/api/budgets/" + budgetId)
            .then(response => {
                dispatch({
                    type: "GET_BUDGET_INFO",
                    info: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MESSAGE",
                    errMsg: "Sorry we could not obtain your budget."
                })
            })
    }
}

export const addBudget = (newBudget) => {
    console.log('the new budge', newBudget);
    return dispatch => {
        axios.post("/api/budgets", newBudget)
            .then(response => {
                console.log('how about here', response);
                dispatch({
                    type: "ADD_BUDGET",
                    newBudget: response.data
                })
            })
    }
}
export const editBudget = (editedBudget, id) => {
    return dispatch => {
        axios.put("/api/budgets/" + id, editedBudget)
            .then(response => {
                dispatch({
                    type: "EDIT_BUDGET",
                    editedBudget: response.data,
                    id
                })
            })
    }
}
export const deleteBudget = (id) => {
    return dispatch => {
        axios.delete("/api/budgets/" + id)
            .then(response => {
                dispatch({
                    type: "DELETE_BUDGET",
                    id
                })
            })
    }
}

export default budgetsReducer;