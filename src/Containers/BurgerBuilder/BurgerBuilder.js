import React, { Component } from 'react'
import Aux from '../../Components/HOC/Aux';
import Burger from '../../Components/Burger/Burger';

/* This is a Stateful Class. It is in Container folder. */

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);

        /* this. is  must be there because we are in a method! (constructor) */
        this.state = {
            /* inside ingredients will change */
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            }
        }
    }

    render() {
        const { ingredients } = this.state;
        return(
            <Aux>
                <Burger 
                    ingredients={ingredients}
                />
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;