import axios from "../../axios-order";
import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData,
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

// Note: copied and pasted from ContactData but since routing is not in here, it will not work,
// We can pass in the argument so that there is routing, but will take different path
export const purchaseBurger = (orderData, props) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart()); // loading is true, after process is done, loading becomes false
		axios
			.post("/orders.json", orderData)
			.then((response) => {
				// response.data.name is GIVEN by the database
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
				// props.history.push("/");
			})
			.catch((error) => {
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

export const fetchOrders = () => {
	return (dispatch) => {
		dispatch(fetchOrdersStart());
		axios
			.get("/orders.json")
			.then((res) => {
				const fetchedOrders = [];
				for (let order in res.data) {
					fetchedOrders.push({
						...res.data[order],
						id: order,
					});
				}
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch((err) => {
				dispatch(fetchOrdersFail(err));
			});
	};
};
