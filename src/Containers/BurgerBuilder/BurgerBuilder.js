import React, { Component } from 'react'
import Aux from '../../Components/HOC/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import PropTypes from 'prop-types'

/* Make your own project with CONSTANTS. They're so useful. */
const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .5,
    meat: 1.5,
    bacon: 1
}

/* This is a Stateful Class. It is in Container folder. */
class BurgerBuilder extends Component {
    constructor(props) {
        super(props);

        /* this. must be there because we are in a method! (constructor) */
        this.state = {
            /* inside ingredients will change */
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 6
        }
    }

    /* methods to increase ingredients here... pass it to the build control. */
    /* Follow LOGIC of how the argument is PASSED through different components. */
    AddIngredientHandler = (type) => {
        /* Increase Count till 3 ingredients */
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 2) {
            const updatedCount = oldCount + 1;
            const updatedIngredients = {
                /* spread operator AND bracket notation so that it can be DYNAMIC value! */
                ...this.state.ingredients,
                [type]: updatedCount
            };

            /* Increase Price */
            const addToTotalPrice = INGREDIENT_PRICES[type]
            const oldPrice = this.state.totalPrice;

            /* I am keeping the price state, here is where calculation is applied. */
            const updatedPrice = oldPrice + addToTotalPrice;

            this.setState({
                ingredients: updatedIngredients,
                totalPrice: updatedPrice
            }, () => {console.log(this.state)});
        }
    }

    DeleteIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients,
                [type]: updatedCount
            };

            /* Increase Price */
            const SubtractToTotalPrice = INGREDIENT_PRICES[type]
            const oldPrice = this.state.totalPrice;

            /* I am keeping the price state, here is where calculation is applied. */
            const updatedPrice = oldPrice - SubtractToTotalPrice;

            this.setState({
                ingredients: updatedIngredients,
                totalPrice: updatedPrice
            }, () => {console.log(this.state)});
        }
    }

    render() {
        /* Copies ingredients object in an immutable way */
        /* 
        It will always start at HERE, THEN changes the button!
        */
        const disableLess = {
            ...this.state.ingredients
        }

        /* converting the values of cheese, meat... to boolean values! */
        for (let key in disableLess) {
             /* TRUE to disable button, FALSE to enable button */
            disableLess[key] = disableLess[key] <= 0
        }

        /* 
        {
            cheese: true,
            salad: false
            ...
        } 
        */

       const disableMore = {
        ...this.state.ingredients
        }
        for (let key in disableMore) {
            /* TRUE to disable button, FALSE to enable button */
            disableMore[key] = disableMore[key] > 2
        }

        const { ingredients } = this.state;
        return(
            <Aux>
                <Burger ingredients={ingredients} />
                <BuildControls 
                    more={this.AddIngredientHandler}
                    less={this.DeleteIngredientHandler}
                    disableLess={disableLess}
                    disableMore={disableMore}
                    price={this.state.totalPrice}
                />

            </Aux>
        );
    }
}

BurgerBuilder.propTypes = {
    type: PropTypes.string
}

export default BurgerBuilder;