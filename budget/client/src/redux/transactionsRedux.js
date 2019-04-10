import axios from 'axios';

const initialState = {
    transactionData: [],
    loading: true,
    errMsg: ""
}

// this.state = this.initialState;
const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_TRANSACTIONS":
            return {
                ...state,
                loading: false,
                transactionData: action.data
            }
        case "ADD_TRANSACTION":
            return {
                ...state,
                loading: false,
                transactionData: [...state.transactionData, action.newTransaction]
            }
        case "EDIT_TRANSACTION":
            return {
                ...state,
                loading: false,
                transactionData: state.transactionData.map(transaction => {
                    if (transaction._id === action.id) {
                        return action.editedTransaction
                    } else {
                        return transaction
                    }
                })
            }
        case "DELETE_TRANSACTION":
            return {
                ...state,
                loading: false,
                transactionData: state.transactionData.filter(transaction => transaction._id !== action.id)
            }
        default:
            return state;
    }
}
export const getTransactions = () => {
    return dispatch => {
        axios.get("/api/transactions")
            .then(response => {
                dispatch({
                    type: "GET_TRANSACTIONS",
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
export const addTransaction = (newTransaction) => {
    return dispatch => {
        axios.post("/api/transactions", newTransaction)
            .then(response => {
                dispatch({
                    type: "ADD_TRANSACTION",
                    newTransaction: response.data
                })
            })
    }
}
export const editTransaction = (editedTransaction, id) => {
    return dispatch => {
        axios.put("/api/transactions/" + id, editedTransaction)
            .then(response => {
                dispatch({
                    type: "EDIT_TRANSACTION",
                    editedTransaction: response.data,
                    id
                })
            })
    }
}
export const deleteTransaction = (id) => {
    return dispatch => {
        axios.delete("/api/transactions/" + id)
            .then(response => {
                dispatch({
                    type: "DELETE_TRANSACTION",
                    id
                })
            })
    }
}

export default transactionsReducer;