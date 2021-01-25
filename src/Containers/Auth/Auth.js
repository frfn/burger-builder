import React, { Component } from "react";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../Store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Enter Email Address",
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
					minLength: 10,
				},
				valid: false,
				touched: false,
				errorMessage: "Email Address...",
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Enter Password",
				},
				value: "",
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
				errorMessage: "Password...",
			},
		},
		isSignup: true,
	};

	componentDidMount() {
		// buildingBurger === boolean value && authRedirectPath === string
		// if user clicks on Sign In/ Register, set redirect path to "/"

		/* if youre NOT building a burger && the path is NOT "/", go back to "/" */

		if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
			// / !== /

			/* 
			if user is NOT building a burger AND the path is /checkout, redirect to / -- this is an error, because there is NO order being processed
			this is a routing guard
			*/
			this.props.onSetAuthRedirectPath(); // sets redirect path to "/"
		}
	}

	// check individual fields to see if valid
	checkValidity = (value, rules) => {
		let isValid = true;
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
	};

	// event is used for event.target.value
	onChangeHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			},
		};
		this.setState(
			{
				controls: updatedControls,
			}
			// () => {
			// 	console.log(this.state.controls[controlName].valid);
			// }
		);
	};

	onSubmitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignup
		);
	};

	// checks all Input fields to see if populated
	validAuthCheck = () => {
		let orderIsValid = true;
		const updateAuthControl = {
			...this.state.controls,
		};
		for (let prop in updateAuthControl) {
			if (updateAuthControl[prop].valid === false) {
				orderIsValid = false;
				break;
			}
		}
		return orderIsValid;
	};

	switchAuthModeHandler = () => {
		this.setState((prevState) => {
			return { isSignup: !prevState.isSignup }; // on and off
		});
	};

	// tests to see what onSubmit would do, if it's inside form, it knows that if button is pressed, it will execute the code if button is pressed inside the <form>
	test = (event) => {
		event.preventDefault();
		console.log("test");
	};

	// render can only have things NOT a method, methods should be before and content code should GO inside render block
	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}

		let form = formElementsArray.map((formElement) => (
			<Input
				changed={
					(event) =>
						/* Why TWO? event is a gimme, formElement.id is for input identifer SO to access .value property */
						this.onChangeHandler(event, formElement.id) // updates the values of each input
				}
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation.required}
				touched={formElement.config.touched}
				errorMessage={formElement.config.errorMessage}
			/>
		));

		if (this.props.loading) {
			form = <Spinner />;
		}

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = <p>{this.props.error}</p>;
		}

		let authRedirect = null;
		// NOW when you're finally authenticated, SINCE the redirect URL has changed, it will go to /checkout now
		// once the user signs in / creates acc, they're authenticated
		// the authRedirectPath is connected to the auth reducer and the URL path of /checkout
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				<h3>
					{!this.state.isSignup
						? "Log In to Account"
						: "Create New Account"}
				</h3>
				{errorMessage}
				<form onSubmit={this.onSubmitHandler}>
					{form}
					<Button buttonType="Success">
						{this.state.isSignup ? "Register" : "Sign In"}
					</Button>
				</form>
				<Button buttonType="Danger" click={this.switchAuthModeHandler}>
					Switch To{" "}
					{this.state.isSignup ? "Sign In" : "Create New Account"}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
		onAuth: (email, password, isSignup) =>
			dispatch(actions.auth(email, password, isSignup)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
