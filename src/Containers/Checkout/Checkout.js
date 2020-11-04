import React, { Component } from "react";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// import * as actions from "../../Store/actions/index";

class Checkout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ingredients: {},
			price: 0,
		};
	}

	componentDidMount() {
		// console.log(this.props); wanted to see the token
	}

	// it's TOO late, even though the render is here, it does NOT set purchased to FALSE
	/* componentWillMount() {
		this.props.onInitPurchase(); // this sets state.order.purchased to FALSE so it doesnt redirect to "/"
	} */
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
		// redirect to root if no ingredients, bedcause error will occur
		// you cannot map an undefined object
		let summary = <Redirect to="/" />;

		if (this.props.ings) {
			// console.log(this.props.purchased)
			const purchasedRedirect = this.props.purchased ? (
				<Redirect to="/" />
			) : null;
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}
						// why we connected to the STORE, to show the BURGER.
						ingredients={this.props.ings}
					/>
					{/* .path or .url works the same, nest ROUTE */}
					<Route
						// we used like because it seems like you need to
						// you have to <Route to='contact-data' /> in App.js to make it work WITHOUT the other URL words ex. (checkout/etc/etc/URL)
						// here we are using the CURRENT url + /contact-data
						// Why? by going to this current path, it renders ContactData component
						// How? continueHandler replaces URL with exact URL of /contact-data route

						// At this URL, show the component (ContactData) at the URL path
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

		// either a Redirect if no ings OR the burger + contact data
		return summary;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		// price: state.totalPrice,
		purchased: state.order.purchased,
		token: state.auth.token,
	};
};

/* We do not do it here because componentWillMount will be to late, we do ON BurgerBuilder.js */
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onInitPurchase: () => dispatch(actions.purchaseInit()),
// 	};
// };

// a function that returns an HOC function
// connect(null, mapDispatchToProps) <-- if no stateToProps but want dispatchToProps
export default connect(mapStateToProps /* mapDispatchToProps */)(Checkout);
