import * as actionTypes from "../actions/actionTypes";

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
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.5,
	meat: 1.5,
	bacon: 1,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
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
			};

		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.payload.ingredientName]:
						state.ingredients[action.payload.ingredientName] - 1,
				},
				totalPrice:
					state.totalPrice -
					INGREDIENT_PRICES[action.payload.ingredientName],
			};

		// new async method!
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				// ingredients: action.ingredients,
				/* the ingredients is not mapped correctly */

				// you lose flexibility since you're adding !
				ingredients: {
					salad: action.ingredients.salad,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat,
				},
				error: false
			};

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true,
			};

		default:
			return state;
	}
};

export default reducer;
