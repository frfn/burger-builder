import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";

import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../Components/UI/Spinner/Spinner";

class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: "",
		},
		loading: false,
	};

	nameAndEmailChangeHandler = (e) => {
		const { name, value } = e.target;
		const currentState = this.state;
		this.setState({
			...currentState,
			[name]: value,
		});
	};

	addressChangeHandler = (e) => {
		const { name, value } = e.target;
		const currentState = this.state.address;
		this.setState({
			address: {
				...currentState,
				[name]: value,
			},
		});
	};

	orderHandler = (e) => {
		e.preventDefault();
        this.setState({ loading: true });
        /* Dummy Data */
		const order = {
			ingredients: this.props.ingredients,
			totalPrice: this.props.totalPrice,
			customer: {
				name: "",
				email: "",
				address: {
					street: "",
					postalCode: "",
				},
			},
			deliveryMethod: "express",
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
		let form = (
			<form className={classes.Form}>
				<input
					className={classes.Input}
					type='text'
					name='name'
					placeholder='Name'
				/>
				<input
					className={classes.Input}
					type='text'
					name='email'
					placeholder='Email'
				/>
				<input
					className={classes.Input}
					type='text'
					name='street'
					placeholder='Street'
				/>
				<input
					className={classes.Input}
					type='text'
					name='Postal'
					placeholder='Zip Code'
				/>

				{/* When Pressing the Button, no indication that it has been pressed. Grab a spinner! */}
				<Button click={this.orderHandler} buttonType='Success'>
					ORDER
				</Button>
			</form>
		);

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
