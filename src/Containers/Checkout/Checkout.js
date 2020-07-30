import React, { Component } from "react";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";

class Checkout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ingredients: {},
			price: 0,
		};
	}

	componentDidMount() {
		/* new URLSearchParams -- an iterable, so must be an array (for in [object] VS for of [array] */
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;

		for (let param of query.entries()) {
			// ex. ["bacon", "1"] | added '+' to cast to Number
			if (param[0] === "price") {
				price = param[1];
			} else {
				/* name = value */
				ingredients[param[0]] = +param[1];
			}
		}

		this.setState({ ingredients: ingredients, totalPrice: price });
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
				{/* .path or .url works the same, nest ROUTE */}
				<Route
					path={this.props.match.path + "/contact-data"}
                    // component={ContactData}
                    
                    /* very important that we USE render if we want to pass properties WHILE using routing */
					render={(props) => (
						<ContactData
							ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            {...props}
						/>
					)}
				/>
			</div>
		);
	}
}

export default Checkout;
