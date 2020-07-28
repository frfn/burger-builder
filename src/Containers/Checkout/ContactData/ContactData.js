import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";

import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";

class ContactData extends Component {
	state = {
		// name: "",
		// email: "",
		// address: {
		// 	street: "",
		// 	postalCode: "",
		// },

		/* form fields + JS Config */
		// OBJ vs ARR: well you can make this an array, makes more sense tho that 'orderForm' is an object
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Enter Name" },
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touch: false,
				errorMessage: "Please enter a valid name...",
			},
			email: {
				elementType: "input",
				elementConfig: { type: "email", placeholder: "Enter Email" },
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touch: false,
				errorMessage: "Please enter a valid Email Address...",
			},
			street: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Enter Street" },
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touch: false,
				errorMessage: "Please enter a valid Street...",
			},
			country: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Enter Country" },
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touch: false,
				errorMessage: "Please enter a valid Country...",
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
				touch: false,
				errorMessage: "Please enter a valid ZIP Code...",
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					option: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
				// value: ''
				// validation: {
				// 	required: true,
				// },
				// valid: false,
				// touch: false,
			},
		},
		loading: false,
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
		/* by changing isValid to true and adding && isValid, it is going to do what we want */
		let isValid = true; // instead of false

		if (rules.required) {
			/* .trim() removes white spaces*/
			isValid = value.trim() !== "" && isValid;
		}

		/* want more rules? here's an ex! You can be creative here! */
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.minLength && isValid;
		}

		/* true or false */
		return isValid;
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
		if (inputIdentifier !== "deliveryMethod") {
			updatedFormElement.valid = this.checkValidity(
				updatedFormElement.value,
				updatedFormElement.validation
			);
		}

		updatedFormElement.touch = true; // maybe if event.target.value > 0

		/* this works because FALSE overrides TRUE in the truth table for && */
		/* I created my own helper method */
		// let formIsValid = true;
		// for (let inputIdentifier in updatedOrderForm) {
		// 	formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
		// }

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
				break;
			}
			console.log(updatedOrderForm[prop].valid);

			/* if it does not HAVE a .valid value, skip!, so method does work even if value does not include .valid in deliveryMethod prop */
		}

		/* boolean value */
		return orderIsValid;
	};

	orderHandler = (e) => {
		e.preventDefault(); // stops reloading
		this.setState({ loading: true });
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

		const order = {
			ingredients: this.props.ingredients,
			totalPrice: this.props.totalPrice,

			/* 
				ex. formData = { 
						{name: 'flex'}, 
						{email: '@gmail'},
						... etc. 
					} 
			*/
			orderData: formData,
		};

		axios
			.post("/orders.json", order)
			.then((response) => {
				console.log(response);
				this.setState({ loading: false });
			})
			.catch((error) => {
				this.setState({ loading: false });
			});

		/* this is only possible BECAUSE the props are being passed from the previos component, Checkout.js */
		this.props.history.push("/");
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

		console.log(formElementsArray);

		/* When Pressing the Button, no indication that it has been pressed. Grab a spinner! */
		/* disabled={!this.state.formIsValid} inside Button prop */
		let button = this.validOrderCheck() ? (
			<Button buttonType='Success'>
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
					return (
						/* Passing in so much shit. */
						<Input
							// label={formElement.id}
							changed={(event) =>
								/* Why TWO? event is a gimme, formElement.id is for input identifer SO to access .value property */
								this.onChangeHandler(event, formElement.id)
							}
							key={formElement.id} // needed for .map()
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid} // why '!' -- it is so that the Input becomes user friendly, no red CSS
							shouldValidate={formElement.config.validation} // if property has a valid property, run CSS check in Input.js
							touch={formElement.config.touch} // one time thing, sees if user goes on field, used for CSS
							errorMessage={formElement.config.errorMessage} // an error message that will display on bottom of field if incorrect
						/>
					);
				})}
				{button}
			</form>
		);

		/* if loading is true, this becomes a spinner */
		if (this.state.loading) {
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

export default ContactData;
