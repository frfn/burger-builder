import React, { Component } from "react";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";

// Redux
import { connect } from "react-redux";

class Checkout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ingredients: {},
			price: 0,
		};
	}

	// componentDidMount() {

	// 	// EDIT 1 --
	// 	/* new URLSearchParams -- an iterable, so must be an array (for in [object] VS for of [array] */
	// 	// const query = new URLSearchParams(this.props.location.search);

	// 	// const ingredients = {};
	// 	// let price = 0;

	// 	// for (let param of query.entries()) {
	// 	// 	console.log(param)
	// 	// 	// ex. ["bacon", "1"] | added '+' to cast to Number
	// 	// 	if (param[0] === "price") {
	// 	// 		price = param[1];
	// 	// 	} else {
	// 	// 		/* name = value */
	// 	// 		ingredients[param[0]] = +param[1];
	// 	// 	}
	// 	// }

	// 	// this.setState({ ingredients: ingredients, totalPrice: price });
	// }

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		/* <Redirect /> does the same behavior AS .replace() -- redirect does NOT push onto stack */
		this.props.history.replace("/checkout/contact-data");
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}

					// why we connected to the STORE, to show the BURGER.
					ingredients={this.props.ings}
				/>
				{/* .path or .url works the same, nest ROUTE */}
				<Route
					path={this.props.match.path + "/contact-data"}

					// EDIT 2 -- back to it, commented out but now we're using this.
					component={ContactData}

					// EDIT 1 --
					/* very important that we USE render if we want to pass properties WHILE using routing */
					// render={(props) => (
					// 	<ContactData
					// 		ingredients={this.props.ings}
					// 		// totalPrice={this.props.price}

					// 		// + all the routing properties!
					// 		// ex. history, location, match, staticContext
					// 		{...props}
					// 	/>
					// )}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		// price: state.totalPrice,
	};
};

// a function that returns an HOC function
export default connect(mapStateToProps)(Checkout);
