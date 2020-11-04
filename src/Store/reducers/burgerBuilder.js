import * as actionTypes from "../actions/actionTypes";
import { udpateObject } from "../utility";

const initialState = {
	ingredients: null,
	/* null because async from thunk method now! */
	// {
	// 	salad: 0,
	// 	cheese: 0,
	// 	meat: 0,
	// 	bacon: 0,
	// },

	// LOOK HERE! Also part of state -- price is here b/c it will be easier to manage
	totalPrice: 6,
	error: false,

	/* after authenticating, ings will remain */
	building: false,
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.5,
	meat: 1.5,
	bacon: 1,
};

// outsourced methods for a cleaner reducer
const addIngredient = (state, action) => {
	/* 
	Maybe we don't need to copy the state since the state is BEING passed in,
	not manipulating the CURRENT state.
		*/

	// const currentState = { ...state }; // {ings, price, error}
	// const currentIngredients = { ...state.ingredients }; // ings: {...ings}

	// cleaner look
	const ingName = action.payload.ingredientName;

	const updatedIngredient = {
		...state.ingredients,
		[ingName]: state.ingredients[ingName] + 1,
	};
	const updatedPrice = state.totalPrice + INGREDIENT_PRICES[ingName];

	const updatedState = {
		ingredients: updatedIngredient,
		totalPrice: updatedPrice,

		// auth related
		building: true,
	};

	// console.log(currentState, currentIngredients, updateIngredient, updatePrice)
	return udpateObject(state, updatedState);
};

// I leave here to see the iterations of how reducers can change
const removeIngredient = (state, action) => {
	const updatedIngredient = {
		...state.ingredients,
		[action.payload.ingredientName]:
			state.ingredients[action.payload.ingredientName] - 1,
	};
	const updatedPrice =
		state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName];
	return {
		...state,
		ingredients: {
			...updatedIngredient,
		},
		totalPrice: updatedPrice,

		// auth related
		building: true,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		/* {
				...state, // we have to unpack state, no matter what, as well as because this is not setState, does not merge automatically, totalPrice!
				ingredients: {
					...state.ingredients,

					// dynamic naming for object properties
					[action.payload.ingredientName]:
						state.ingredients[action.payload.ingredientName] + 1,
				},
				totalPrice:
					state.totalPrice +
					INGREDIENT_PRICES[action.payload.ingredientName],
			}; */

		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);

		// new async method!
		case actionTypes.SET_INGREDIENTS:
			return udpateObject(state, {
				ingredients: {
					salad: action.ingredients.salad,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat,
				},
				error: false,
				totalPrice: 6, // hardcoded to restart the totalPrice, it was not going back to $6!
				building: false,
			});
		// return {
		// 	...state,
		// 	// ingredients: action.ingredients,
		// 	/* the ingredients is not mapped correctly, ordering ings manually */

		// 	// you lose flexibility since you're adding !
		// 	ingredients: {
		// 		salad: action.ingredients.salad,
		// 		bacon: action.ingredients.bacon,
		// 		cheese: action.ingredients.cheese,
		// 		meat: action.ingredients.meat,
		// 	},
		// 	error: false,
		// 	totalPrice: 6,
		// };

		// check how this method is used
		/* Since error is here is in this file, the action creator has to dispatch the object with error in it to change the value */
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return udpateObject(state, { error: true });

		default:
			return state;
	}
};

export default reducer;
