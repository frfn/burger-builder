import axios from "../../axios-order";
import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id, // response.data.name
		orderData: orderData, // orderData
	};
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error,
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
};

// We can pass in the argument so that there is routing, but will take different approach
/* used BurgerBuilder.js to change the redirect link in auth.js reducer to /checkout, WHEN user clicks on sign up,
so after finishing signing up, they are redirected to /checkout page rather than root (/) page */
export const purchaseBurger = (orderData, token, props) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart()); // loading is true, after process is done, loading becomes false
		axios
			.post(
				"/orders/" + orderData.userId + ".json?auth=" + token,
				orderData
			) // by posting, this adds on to the data
			.then((response) => {
				// console.log(response);
				// response.data.name is GIVEN by the database
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
				// props.history.push("/");
			})
			.catch((error) => {
				// console.log(error);
				dispatch(purchaseBurgerFail(error));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	};
};

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error,
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

// thunk method
export const fetchOrders = (userId, token) => {
	// getState, gets the Central Store state!!
	return (dispatch, getState) => {
		dispatch(fetchOrdersStart());
		// console.log(userId);
		// console.log(token);
		axios

			/* 
			filtering!

			PLEASE NOTE THE QUOTATION MARKS!  
				  this is understood by FireBase --> orderBy="userId"&equalsTo="asDFadsfw4524adfaesdgse"

			const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo=""' + userId + '"';
			axios.get('/orders.json' + queryParams)
			*/

			//auth?= is a query param
			.get(`/orders/${userId}.json?auth=${token}`) // auth IS a variable that is explicitly used in Firebase ... auth && token is PROBABLY CONNECTED inside Firebase somehow!
			.then((res) => {
				console.log(res);
				if (res) {
					const fetchedOrders = [];
					for (let order in res.data) {
						fetchedOrders.push({
							...res.data[order],
							id: order,
						});
					}
					// console.log(getState());
					console.log(fetchedOrders);
					dispatch(fetchOrdersSuccess(fetchedOrders));
				}
			})
			.catch((err) => {
				// console.log(err);
				dispatch(fetchOrdersFail(err));
			});
	};
};
