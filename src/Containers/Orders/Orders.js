import React, { Component } from "react";
import Order from "../../Components/Order/Order";

import axios from "../../axios-order";
import withErrorHandler from "../../Components/HOC/withErrorHandler/withErrorHandler";

class Orders extends Component {
	state = {
		order: [],
		loading: true,
	};

	componentDidMount() {
		axios
			.get("/orders.json")
			.then((res) => {
				// console.log(res)

				// for: in for objects, of for arrays
				const fetchedOrders = [];

				// OBJECT: turn the object that contains ALL other objects to be in an array, with a new ID property
				for (let order in res.data) {
					// console.log(order)
					// console.log(res.data[order])

					/* creating a new object, filled with values + the id, ON the spot */
					fetchedOrders.push({
						...res.data[order],
						id: order,
					});
					// console.log(res.data[order])
				}

				this.setState(
					{
						order: fetchedOrders,
						loading: false,
					},
					() => {
						// console.log(fetchedOrders);
					}
				);
			})
			.catch((err) => {
				this.setState({ loading: false });
			});
	}

	render() {
		return (
			<div>
				{this.state.order.map((order) => {
					return (
						<Order
							key={order.id}
							totalPrice={+order.totalPrice}
							ingredients={order.ingredients}
							name={order.orderData.name}
						/>
					);
				})}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
