import React, { Component } from "react";
import Order from "../../Components/Order/Order";

import axios from "../../axios-order";
import withErrorHandler from "../../Components/HOC/withErrorHandler/withErrorHandler";

import * as actions from "../../Store/actions/index";
import { connect } from "react-redux";

import Spinner from "../../Components/UI/Spinner/Spinner";

class Orders extends Component {
	// state = {
	// 	order: [],
	// 	loading: true,
	// };

	componentDidMount() {
		this.props.onFetchOrders();

		/* MOVED TO ACTION CREATORS for ORDERS */
		// axios
		// 	.get("/orders.json")
		// 	.then((res) => {
		// 		// console.log(res)

		// 		// for: in for objects, of for arrays
		// 		const fetchedOrders = [];

		// 		// OBJECT: turn the object that contains ALL other objects to be in an array, with a new ID property
		// 		for (let order in res.data) {
		// 			// console.log(order)
		// 			// console.log(res.data[order])

		// 			/* creating a new object, filled with values + the id, ON the spot */
		// 			fetchedOrders.push({
		// 				...res.data[order],
		// 				id: order,
		// 			});
		// 			// console.log(res.data[order])
		// 		}

		// 		this.setState(
		// 			{
		// 				order: fetchedOrders,
		// 				loading: false,
		// 			},
		// 			() => {
		// 				// console.log(fetchedOrders);
		// 			}
		// 		);
		// 	})
		// 	.catch((err) => {
		// 		this.setState({ loading: false });
		// 	});
	}

	render() {
		let orders = this.props.loading ? (
			<Spinner />
		) : (
			/* If nothing to map, nothing will show. :) */
			this.props.order.map((order) => {
				return (
					<Order
						key={order.id}
						totalPrice={+order.totalPrice}
						ingredients={order.ingredients}
						name={order.orderData.name}
					/>
				);
			})
		);

		return <div>{orders}</div>;
	}
}

export const mapStateToProps = (state) => {
	return {
		loading: state.order.loading,
		order: state.order.orders,
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
