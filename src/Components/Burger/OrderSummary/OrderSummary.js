import React from 'react'
import Aux from '../../HOC/Aux'
import Button from '../../UI/Button/Button'

const OrderSummary = ( { ingredients, decline, checkout } ) => {

    const ingredientSummary = Object.keys(ingredients)
        .map(key => {
            /* Inline Styling! */
            return <li key={key}>
                       <span style={{textTransform: 'capitalize'}}>
                           {key}
                       </span> : {ingredients[key]}
                   </li> 
        })

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Your delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button buttonType='Danger' click={decline}>CANCEL</Button>
            <Button buttonType='Success' click={checkout}>CONTINUE</Button>
        </Aux>
    );
}

export default OrderSummary;