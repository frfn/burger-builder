import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";

import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";

// Redux
import { connect } from "react-redux";
import * as actions from "../../../Store/actions/index";

// HOC
import withErrorHandler from "../../../Components/HOC/withErrorHandler/withErrorHandler";
import { withRouter } from "react-router";

class ContactData extends Component {
	componentDidMount() {
		// console.log(this.props);
	}

	state = {
		// name: "",
		// email: "",
		// address: {
		// 	street: "",
		// 	postalCode: "",
		// },

		/* form fields + JS Config */
		// OBJ vs ARR: well you can make this an array, makes more sense tho that 'orderForm' is an object

		// error message is SET in Input.js
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Enter Name" },
				value: "",
				validation: {
					required: true,
					minLength: 5,
				},
				valid: false,
				touched: false,
				errorMessage: "Name...",
			},
			email: {
				elementType: "input",
				elementConfig: { type: "email", placeholder: "Enter Email" },
				value: "",
				validation: {
					required: true,
					minLength: 5,
				},
				valid: false,
				touched: false,
				errorMessage: "Email Address...",
			},
			street: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Enter Street" },
				value: "",
				validation: {
					required: true,
					minLength: 5,
				},
				valid: false,
				touched: false,
				errorMessage: "Street...",
			},
			country: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Enter Country" },
				value: "",
				validation: {
					required: true,
					minLength: 5,
				},
				valid: false,
				touched: false,
				errorMessage: "Country...",
			},
			postalCode: {
				elementType: "input",
				elementConfig: {
					type: "number",
					placeholder: "Enter ZIP Code",
				},
				value: "",
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false,
				errorMessage: "ZIP Code...",
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					option: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
				/* For the troubleshoot, leave the delivery method to have NO value. */
				value: "fastest",
				validation: {
					required: true,
				},
				valid: true,
				touched: false,
			},
		},
		// loading: false,
		formIsValid: false,
	};

	// nameAndEmailChangeHandler = (e) => {
	// 	const { name, value } = e.target;
	// 	const currentState = this.state;
	// 	this.setState({
	// 		...currentState,
	// 		[name]: value,
	// 	});
	// };

	// addressChangeHandler = (e) => {
	// 	const { name, value } = e.target;
	// 	const currentState = this.state.address;
	// 	this.setState({
	// 		address: {
	// 			...currentState,
	// 			[name]: value,
	// 		},
	// 	});
	// };

	checkValidity = (value, rules) => {
		// TRUTH TABLE:
		// T T = T
		// T F = F

		// rules.minLength & rules.maxLength philosophy, it checks one by one, so if isValid is not true and checked, there is a flaw
		// flaw: it will give WRONG false/true results because code checks the rules (the if statements) one by one

		/* by changing isValid to true and adding && isValid, it is going to do what we want */
		let isValid = true; // instead of false
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;

		// if (rules.required) {
		// 	/* .trim() removes white spaces*/
		// 	isValid = value.trim() !== "" && isValid;
		// }

		// /* want more rules? here's an ex! You can be creative here! */
		// if (rules.minLength) {
		// 	isValid = value.length >= rules.minLength && isValid;
		// }

		// if (rules.maxLength) {
		// 	isValid = value.length <= rules.minLength && isValid;
		// }

		// /* true or false */
		// return isValid;
	};

	onChangeHandler = (event, inputIdentifier) => {
		/* There are 'two' similar copies but the first only copies the props of orderForm, the second copies the values OF THE props of order form! */

		const updatedOrderForm = {
			/* not a deep clone for the values of orderForm, they are POINTERS, you would still mutate the values though! */
			...this.state.orderForm,
		};

		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier],
		};

		// const { name, value } = event.target;

		// this is WHY it is 'universal' for all input fields, event.target uses the .value property
		updatedFormElement.value = event.target.value;

		// for validity, checkValidity returns a boolean value
		// if (inputIdentifier !== "deliveryMethod") {
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		// }

		updatedFormElement.touched = true; // maybe if event.target.value > 0

		/* this works because FALSE overrides TRUE in the truth table for && */
		/* I created my own helper method */
		// let formIsValid = true;
		// for (let inputIdentifier in updatedOrderForm) {
		// 	formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid <-- this will FIND the false value
		//  																		it is the same as valid OrderCheck, and MORE efficient!
		// }

		// the current order form (not changed yet--only change IMMUTABLY), and the obj inside (like country), will equal to the new updatedFormElement because it has BEEN changed
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		this.setState({
			orderForm: updatedOrderForm,
			// formIsValid: formIsValid,
		});
	};

	validOrderCheck = () => {
		let orderIsValid = true;

		const updatedOrderForm = {
			...this.state.orderForm,
		};

		for (let prop in updatedOrderForm) {
			/* delivery methiod does NOT have .valid so it was giving me undefined... */
			// if (prop === "deliveryMethod") {
			// 	break;
			// }

			if (updatedOrderForm[prop].valid === false) {
				orderIsValid = false;
				break; // if it finds a false value, break INSTANTLY!
			}
			// console.log(updatedOrderForm[prop].valid);

			/* if it does not HAVE a .valid value, skip!, so method does work even if value does not include .valid in deliveryMethod prop */
		}

		// console.log(orderIsValid)

		/* boolean value */
		return orderIsValid;
	};

	// e stands for event
	orderHandler = (e) => {
		e.preventDefault(); // stops reloading

		// edit REDUX, no more loading state here
		// this.setState({ loading: true });ß

		/* Dummy Data */
		// const order = {
		// 	ingredients: this.props.ingredients,
		// 	totalPrice: this.props.totalPrice,
		// 	customer: {
		// 		name: "",
		// 		email: "",
		// 		address: {
		// 			street: "",
		// 			postalCode: "",
		// 		},
		// 	},
		// 	deliveryMethod: "express",
		// };
		const formData = {};

		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}

		// stuff will be changed.
		const order = {
			ingredients: this.props.ings,
			totalPrice: this.props.price,

			/* 
				ex. formData = { 
						{name: 'flex'}, 
						{email: '@gmail'},
						... etc. 
					} 
			*/
			orderData: formData,
			userId: this.props.userId,
		};

		// console.log(order.userId);
		this.props.onBurgerOrder(order, this.props.token, this.props); // this.props was used for .push("/") , not needed since we redirect instead

		// Axios call
		// axios
		// 	.post("/orders.jsonas", order)
		// 	.then((response) => {
		// 		console.log(response);
		// 		this.setState({ loading: false }); // for the spinner, loading animation
		// 		/* this is only possible BECAUSE the props are being passed from the previos component, Checkout.js */
		// 		this.props.history.push("/");
		// 	})
		// 	.catch((error) => {
		// 		this.setState({ loading: true });
		// 		this.props.history.push("/404") // loading error
		// 	});
	};

	render() {
		/* 
			This was used previously, now I am going to map() to dynamically render JSX
				<Input
					inputtype='input'
					type='text'
					name='name'
					placeholder='Name'
				/>
				<Input
					inputtype='input'
					type='text'
					name='email'
					placeholder='Email'
				/>
				<Input
					inputtype='input'
					type='text'
					name='street'
					placeholder='Street'
				/>
				<Input
					inputtype='input'
					type='text'
					name='Postal'
					placeholder='Zip Code'
				/> */

		/* Creating an array that includes an ID + Config for the use of .map() to render the Input components */
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		// console.log(formElementsArray);

		/* disabled={!this.state.formIsValid} inside Button prop */
		let button = this.validOrderCheck() ? (
			<Button buttonType="Success">
				{/* click={this.orderHandler}  */}
				ORDER
			</Button>
		) : (
			<h4>Please Fill Out Form to Order</h4>
		);

		let form = (
			/* note the onSubmit function, here instead of Button's onSubmit */
			<form onSubmit={this.orderHandler} className={classes.Form}>
				{formElementsArray.map((formElement) => {
					// console.log(formElement);
					return (
						/* Passing in so much shit. */
						<Input
							// label={formElement.id}
							changed={
								(event) =>
									/* Why TWO? event is a gimme, formElement.id is for input identifer SO to access .value property */
									this.onChangeHandler(event, formElement.id) // updates the values of each input
							}
							key={formElement.id} // needed for .map()
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							// for error check and validation check
							invalid={!formElement.config.valid} // why '!' -- it is so that the Input becomes user friendly, no red CSS
							shouldValidate={
								formElement.config.validation.required
							} // if property has a valid property, run CSS check in Input.js
							touched={formElement.config.touched} // one time thing, sees if user goes on field, used for CSS
							errorMessage={formElement.config.errorMessage} // an error message that will display on bottom of field if incorrect
						/>
					);
				})}
				{button}
			</form>
		);

		/* When Pressing the Button, no indication that it has been pressed. Grab a spinner! */
		/* if loading is true, this becomes a spinner */
		if (this.props.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Please Enter Contact Information</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

// props was used for the withRouter, routing props to use push("/") to root
const mapDispatchToProps = (dispatch) => {
	return {
		onBurgerOrder: (orderData, token, props) =>
			dispatch(actions.purchaseBurger(orderData, token, props)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(withErrorHandler(ContactData, axios))
);
