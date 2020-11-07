import * as actionTypes from "../actions/actionTypes";
/* You can use the utility method here, but save yourself the time, you know how to do it */

const initialState = {
	orders: [], // orders are filled via axios call to database
	loading: false,
	purchased: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// order post
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			// console.log(action.orderData);
			const newOrder = {
				...action.orderData,
				id: action.orderId,
			};
			// console.log(newOrder);
			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder), // you don't really need this since we fetch data from FireBase
				purchased: true, // return to root "/"
			};
		case actionTypes.PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false, // why false? Because we're done, error is handled through modal
			};
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.PURCHASE_INIT:
			return {
				...state,
				purchased: false,
			};

		// orders get
		case actionTypes.FETCH_ORDERS_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				orders: action.orders,
				loading: false,
			};
		case actionTypes.FETCH_ORDERS_FAIL:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

export default reducer;
