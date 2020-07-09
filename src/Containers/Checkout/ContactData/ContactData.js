import React, { Component } from "react";
import Button from '../../../Components/UI/Button/Button'

import classes from './ContactData.module.css'

class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: "",
		},
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
                [name]: value
            }
		});
	};

	render() {
		return (
			<div className={classes.ContactData}>
				<h4>Please Enter Contact Information</h4>
				<form className={classes.Form}>
                    <input className={classes.Input} type='text' name='name' placeholder='Name' />
                    <input className={classes.Input} type='text' name='email' placeholder='Email' />
                    <input className={classes.Input} type='text' name='street' placeholder='Street' />
                    <input className={classes.Input} type='text' name='Postal' placeholder='Zip Code' />
                    <Button buttonType="Success">ORDER</Button>
                </form>
			</div>
		);
	}
}

export default ContactData;
