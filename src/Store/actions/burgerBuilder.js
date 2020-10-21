import axios from "../../axios-order";
import * as actionTypes from "../actions/actionTypes";

// imagine these being the objects you dispatch in the BurgerBuilder.js!
// anything besides type is an "action" --> action.payload.ingredientName --> used in the reducers/burgerBuilder.js
const addIngredient = (payload) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		payload: payload,
	};
};

const removeIngredient = (payload) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		payload: payload,
	};
};

// this is for the thunk method!
export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients,
	};
};

// just turns error: true
export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	};
};

const initIngredient = () => {
	return (dispatch) => {
		axios
			.get("/ingredients.json") // res.data are the ingredients!
			.then((res) => {
				// console.log(res)
				dispatch(setIngredients(res.data)); // res.data is an object that will populate reducer's ingredients
			})
			.catch((error) => {
				dispatch(fetchIngredientsFailed());
				console.log(error);
			});
	};
};

export { addIngredient, removeIngredient, initIngredient };
