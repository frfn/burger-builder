import React, { Component } from "react";
import Aux from "../../Components/HOC/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import PropTypes from "prop-types";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../Components/UI/Spinner/Spinner";
import axios from "../../axios-order";
import withErrorHandler from "../../Components/HOC/withErrorHandler/withErrorHandler";

// Redux
import { connect } from "react-redux";
// import * as actionTypes from "../../Store/actions/actionTypes";
import * as actionCreator from "../../Store/actions/index";

/* Make your own project with CONSTANTS. They're so useful. */
// const INGREDIENT_PRICES = {
// 	salad: 0.5,
// 	cheese: 0.5,
// 	meat: 1.5,
// 	bacon: 1,
// };

/* This is a Stateful Class. It is in Container folder. */
class BurgerBuilder extends Component {
	constructor(props) {
		super(props);

		/* this. must be there because we are in a method! (constructor) */
		this.state = {
			/* inside ingredients will change */
			// ingredients: null,
			//{
			//    salad: 0,
			//    bacon: 0,
			//    cheese: 0,
			//   meat: 0
			//},
			// totalPrice: null,
			/* for button! */
			// checkoutButton: false,
			purchaseNow: false,
			// loading: false,
			// error: false,
		};
	}

	// .json is SUPER IMPORTANT, IT MUST be there.
	componentDidMount() {
		// ** ADDING REDUX ASYNC FUNCTION ** //
		// EDIT 2 -- action creator + redux thunk!
		this.props.onInitIngredients();

		// EDIT 1 -- You can do this, but do EDIT 2
		// axios
		// 	.get("ingredients.json")
		// 	.then((res) => {
		// 		// dispatch call!
		// 	})
		// 	.catch((error) => {
		// 		this.setState({ error: true });
		// 		console.log(error);
		// 	});
		// test, this works... .json is the endpoint object that we will reach
		// axios.get("ingredients/bacon.json").then((res) => {
		// 	console.log(res)
		// })
		// console.log(this.props) I wanted to test if the Router Properties are being passed
		// axios
		// 	.get(
		// 		"https://react-my-burger-b4a98.firebaseio.com/ingredients.json"
		// 	)
		// 	.then((response) => {
		// 		this.setState({
		// 			ingredients: response.data,
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 		this.setState({
		// 			error: true,
		// 		});
		// 	});
		/* Created by me ... was getting an error in pricing in client side when changing the value server side! Ex. 1 burger = $1.00, does NOT reflect when changed in server side. */
		// axios
		// 	.get("https://react-my-burger-b4a98.firebaseio.com/totalPrice.json")
		// 	.then((response) => {
		// 		// console.log(response);
		// 		/* $6 */
		// 		let totalPriceFromDatabase = response.data;
		// 		if (this.state.ingredients) {
		// 			let updatedPrice = Object.keys(
		// 				this.state.ingredients
		// 			).reduce((accumulator, ingredientKey) => {
		// 				const price = INGREDIENT_PRICES[ingredientKey];
		// 				const total =
		// 					price * this.state.ingredients[ingredientKey];
		// 				return accumulator + total;
		// 			}, totalPriceFromDatabase);
		// 			this.setState(
		// 				{
		// 					totalPrice: updatedPrice,
		// 				},
		// 				() => {
		// 					// console.log(updatedPrice);
		// 				}
		// 			);
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		this.setState({
		// 			error: true,
		// 		});
		// 	});
	}

	/* methods to increase ingredients here... pass it to the build control. */
	/* Follow LOGIC of how the argument is PASSED through different components. */
	// AddIngredientHandler = (type) => {
	// 	/* Increase Count till 3 ingredients */
	// 	const oldCount = this.state.ingredients[type];

	// 	if (oldCount <= 2) {
	// 		const updatedCount = oldCount + 1;
	// 		const updatedIngredients = {
	// 			/* spread operator AND bracket notation so that it can be DYNAMIC value! */
	// 			...this.state.ingredients,
	// 			[type]: updatedCount,
	// 		};

	// 		/* Increase Price */
	// 		const addToTotalPrice = INGREDIENT_PRICES[type];
	// 		const oldPrice = this.state.totalPrice;

	// 		/* I am keeping the price state, here is where calculation is applied. */
	// 		const updatedPrice = oldPrice + addToTotalPrice;

	// 		this.setState({
	// 			ingredients: updatedIngredients,
	// 			totalPrice: updatedPrice,
	// 		}); // , () => {console.log(this.state)}

	// 		/* I didn't know where to call. I knew it did not work because I never called it until now. */
	// 		/* Didn't work because the ingredients weren't updated and that I was working with dated information. */
	// 		this.updateCheckoutButton(updatedIngredients);
	// 	}
	// };

	// DeleteIngredientHandler = (type) => {
	// 	const oldCount = this.state.ingredients[type];

	// 	if (oldCount > 0) {
	// 		const updatedCount = oldCount - 1;
	// 		const updatedIngredients = {
	// 			...this.state.ingredients,
	// 			[type]: updatedCount,
	// 		};

	// 		/* Increase Price */
	// 		const SubtractToTotalPrice = INGREDIENT_PRICES[type];
	// 		const oldPrice = this.state.totalPrice;

	// 		/* I am keeping the price state, here is where calculation is applied. */
	// 		const updatedPrice = oldPrice - SubtractToTotalPrice;

	// 		this.setState(
	// 			{
	// 				ingredients: updatedIngredients,
	// 				totalPrice: updatedPrice,
	// 			},
	// 			() => {
	// 				console.log(this.state);
	// 			}
	// 		);

	// 		this.updateCheckoutButton(updatedIngredients);
	// 	}
	// };

	updateCheckoutButton = (updatedIngredients) => {
		// Just use the updatedIngredients that is passed
		/* const ingredients = {
            // the reason we need to work with dynamic setState is because we might get an OUTDATED state.
            ...updatedIngredients
        } */
		const sum = Object.keys(updatedIngredients)

			/* this returns an array of values */
			.map((key) => {
				return updatedIngredients[key];
			})

			/* NOW use reduce,  */
			.reduce((acc, curr) => {
				return acc + curr;
			}, 0);

		return sum > 0; // total of ingredients! if 0, button is off, is greater than 0, purchase button "turns" on
		// "on" means disabled is set to FALSE in BuildControls.js for the button
		// this.setState({
		// 	checkoutButton: sum > 0,
		// });
	};

	// this makes the MODAL show
	purchaseHandler = () => {
		this.setState({ purchaseNow: true }, () => {
			console.log(this.state.purchaseNow);
		});
	};

	// makes the MODAL hide
	declineHandler = () => {
		this.setState({ purchaseNow: false }, () => {
			console.log(this.state.purchaseNow);
		});
	};

	// this is the CONTINUE button IN THE MODAL
	continueHandler = () => {
		// EDIT 3 --
		this.props.history.push("/checkout");

		/* just add the route string!  */
		// this.props.history.push('/checkout');

		// // EDIT 2 --
		// const queryParams = [];
		// for (let i in this.props.ingredients) {
		// 	/* encodeURIComponent just makes it a valid URL identification */
		// 	// grabs the name                                   // grabs the value OF the name
		// 	queryParams.push(
		// 		encodeURIComponent(i) +
		// 			"=" +
		// 			encodeURIComponent(this.props.ingredients[i])
		// 	);
		// 	// ex. ["bacon=2", "cheese=1", "meat=0", "salad=2"]
		// }

		// queryParams.push("price=" + this.props.totalPrice);

		// const queryString = queryParams.join("&");

		// /* altering code above with PARAMS now */
		// this.props.history.push({
		// 	pathname: "/checkout",
		// 	search: "?" + queryString,
		// });

		// EDIT 1 --
		// alert('You continued!')

		/* loading CSS will appear */

		// MOVED to ContactData

		// this.setState( { loading: true } );
		// const order = {
		//     ingredients: this.state.ingredients,
		//     totatlPrice: this.state.totalPrice,
		//     customer: {
		//         name: 'Flex',
		//         address: {
		//             street: '100 State Street',
		//             zipCode: '02130',
		//             country: 'USA'
		//         },
		//         email: 'flex@flex.com'
		//     },
		//     deliveryMethod: 'car'
		// }

		/* You can comment this out so that the CSS spinner shows! */
		// axios.post('/orders.json', order)
		//     .then(response => {
		//         this.setState({ purchaseNow: false, loading: false })
		//     })
		//     .catch(error => {
		//         this.setState({ purchaseNow: false, loading: false })
		//     })
	};

	render() {
		const {
			// ingredients,
			// totalPrice,
			// checkoutButton,
			purchaseNow,
		} = this.state;

		/* Copies ingredients object in an immutable way */
		/* 
        It will always start at HERE, THEN changes the button!
        */
		const disableLess = {
			...this.props.ingredients,
		};

		/* converting the values of cheese, meat... to boolean values! */
		for (let key in disableLess) {
			/* TRUE to disable button, FALSE to enable button */
			/* everything before 0, like -1 etc. will set the values to TRUE, disabling button */
			disableLess[key] = disableLess[key] <= 0;
		}

		/* 
        {
            cheese: true,
            salad: false
            ...
        } 
        */

		const disableMore = {
			...this.props.ingredients,
		};
		for (let key in disableMore) {
			/* TRUE to disable button, FALSE to enable button */
			/* everything greater than 2 will disable button */
			disableMore[key] = disableMore[key] > 2;
		}

		let orderSummary = null;

		// since ingredients
		let burger = this.props.error ? (
			<p>Ingredients can not be loaded!</p>
		) : (
			<div>
				No error, but loading! I'm async now bitch!
				<Spinner />
			</div>
		);

		if (this.props.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						// more={this.AddIngredientHandler}
						// less={this.DeleteIngredientHandler}
						more={this.props.onAddIngredient}
						less={this.props.onRemoveIngredient}
						disableLess={disableLess}
						disableMore={disableMore}
						price={this.props.totalPrice}
						// purchase={checkoutButton}
						purchase={this.updateCheckoutButton(
							this.props.ingredients
						)} // just returns a BOOLEAN value
						order={this.purchaseHandler}
					/>
				</Aux>
			);

			orderSummary = (
				<OrderSummary
					price={this.props.totalPrice}
					decline={this.declineHandler}
					ingredients={this.props.ingredients}
					checkout={this.continueHandler}
				/>
			);
		}

		// if (this.state.loading) {
		// 	orderSummary = <Spinner />;
		// }

		return (
			<Aux>
				{/* 
                Modal CAN be here if styled with CSS. Without it, it will block content such
                as the Burger and BuildControls!
                 */}
				<Modal decline={this.declineHandler} show={purchaseNow}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

BurgerBuilder.propTypes = {
	type: PropTypes.string,
};

const mapStateToProps = (state) => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
		error: state.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddIngredient: (ingredientName) =>
			dispatch(
				actionCreator.addIngredient({ ingredientName: ingredientName })
			),

		// removeIng(ingredientName) { return dispatch({ ... }) } <-- normal traditional function => just use arrow function hehe
		onRemoveIngredient: (ingredientName) =>
			dispatch(
				actionCreator.removeIngredient({
					ingredientName: ingredientName,
				})
			),
		// dispatch({
		// 	type: actionTypes.REMOVE_INGREDIENT,
		// 	payload: { ingredientName: ingredientName },
		// }),

		onInitIngredients: () => dispatch(actionCreator.initIngredient()),
	};
};

/* BurgerBuilder is passed into withErrorHandler, which just adds a modal that explains an error if occurs,
axios is passed because it will be used to intercept request/response and see if any error, if error occurs, show in Modal */

// connect() from redux!
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
