import * as actionTypes from "../actions";

const initialState = {
	ingredients: {
		salad: 0,
		cheese: 0,
		meat: 0,
		bacon: 0,
	},
	// price is here b/c it will be easier to manage
	totalPrice: 6,
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
				...state,
				ingredients: {
					...state.ingredients,
					[action.payload.ingredientName]:
						state.ingredients[action.payload.ingredientName] + 1,
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
			};

		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.payload.ingredientName]:
						state.ingredients[action.payload.ingredientName] - 1,
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
			};

		default:
			return state;
	}
};

export default reducer;
