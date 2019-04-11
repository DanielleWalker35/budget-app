
import React from 'react';
import { Link } from "react-router-dom";

function BudgetsList(props) {
    console.log(props);
    return (
        <li className='budgetListWrapper'>
            <Link className="budget" to={`/Budget/${props._id}`}>{props.name} - {props.description}</Link>
        </li>
    )
}

export default BudgetsList;