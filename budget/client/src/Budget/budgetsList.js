
import React from 'react';
import { Link } from "react-router-dom";

function BudgetsList(props) {
    console.log(props);
    return (
        <div className='budgetListWrapper'>
            <Link className="budget" to={`/Budget/${props._id}`}><h2>Budget: {props.name}</h2></Link>
            <p>Description: {props.description}</p>
        </div>
    )
}

export default BudgetsList;