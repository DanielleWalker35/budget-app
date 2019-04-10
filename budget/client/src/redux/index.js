
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import budgetReducer from "./budgetsRedux";
import transactionReducer from "./transactionsRedux";

const store = createStore(combineReducers({ budgets: budgetReducer, transactions: transactionReducer} ), applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));

export default store;