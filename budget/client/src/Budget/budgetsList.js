
import React from 'react';
import { Link } from "react-router-dom";

function BudgetsList(props) {
    return (
        <div className='budgetListWrapper'>
            <h1>{props.name}</h1>
            <h3>{props.description}</h3>
            {/* <Link className="oneReview" to={`/ReviewInfo/${props.id}`}>{props.author} - {props.rating}</Link> */}
        </div>
    )
}

export default BudgetsList;