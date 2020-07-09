import React, { Component } from "react";
import ContactData from './ContactData/ContactData'
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";

class Checkout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ingredients: {
				// salad: 1,
				// meat: 1,
				// cheese: 1,
				// bacon: 1,
			},
		};
	}

	componentDidMount() {
		/* new URLSearchParams -- an iterable, so must be an array (for in [object] VS for of [array] */
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};

		for (let param of query.entries()) {
			// ex. ["bacon", "1"] | added '+' to cast to Number
			ingredients[param[0]] = +param[1];
		}

		this.setState({ ingredients: ingredients });
	}

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
					ingredients={this.state.ingredients}
				/>
				{/* .path or .url works the same */}
				<Route
					path={this.props.match.path + "/contact-data"}
					component={ContactData}
				/>
			</div>
		);
	}
}

export default Checkout;
