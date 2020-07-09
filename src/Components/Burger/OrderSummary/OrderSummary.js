import React, { Component } from 'react'
import Aux from '../../HOC/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    /* Lifecycle Method -- checks to see if component is updated */
    componentDidUpdate() {
        // console.log('[OrderSummary] updated.')
    }

    render() {

        const { ingredients, decline, checkout, price } = this.props

        const ingredientSummary = Object.keys(ingredients)
        .map(key => {
            /* Inline Styling! */
            return <li key={key}>
                       <span style={{textTransform: 'capitalize'}}>
                           {key}
                       </span> : {ingredients[key]}
                   </li> 
        })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Your delicious, amazing burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to Checkout?</p>

                <p><strong>Total Price: ${Number(price).toFixed(2)}</strong></p>

                <Button buttonType='Danger' click={decline}>CANCEL</Button>
                <Button buttonType='Success' click={checkout}>CONTINUE</Button>
            </Aux>
        );
    }
}

// const OrderSummary = ( { ingredients, decline, checkout, price } ) => {

//     const ingredientSummary = Object.keys(ingredients)
//         .map(key => {
//             /* Inline Styling! */
//             return <li key={key}>
//                        <span style={{textTransform: 'capitalize'}}>
//                            {key}
//                        </span> : {ingredients[key]}
//                    </li> 
//         })

//     return(
//         <Aux>
//             <h3>Your Order</h3>
//             <p>Your delicious burger with the following ingredients:</p>
//             <ul>
//                 {ingredientSummary}
//             </ul>
//             <p>Continue to Checkout?</p>

//             <p><strong>Total Price: ${Number(price).toFixed(2)}</strong></p>

//             <Button buttonType='Danger' click={decline}>CANCEL</Button>
//             <Button buttonType='Success' click={checkout}>CONTINUE</Button>
//         </Aux>
//     );
// }

export default OrderSummary;