import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
	// console.log(props);
	/* used to output the input element! */
	let inputElement = null;

	/* for error messages */
	let validationError = null;

	/* for css classes, originally an array so we can push error CSS classes */
	/*
	 We did this as an ARRAY so that we can push the invalid class inside it,
	 else, it will just be ONE class in the className={inputClasses.join(" ")}
	 */
	let inputClasses = [];
	inputClasses.push(classes.InputElement);

	/* THREE props?! It is for CSS use and friendly form coloring... you don't need all tbh :D */
	if (props.invalid && props.shouldValidate && props.touched) {
		// pushes class
		inputClasses.push(classes.Invalid);

		// shows error if there is error
		validationError = (
			<p className={classes.ValidationError}>
				Please enter a valid {props.errorMessage}
			</p>
		);

		// console.log(inputClasses);
	}

	/* checking input fields for different types of input -- IMPORTANT this is HOW THE INPUT ELEMENTS ARE CHOSEN */
	switch (props.elementType) {
		case "input":
			// inputElement = <input className={classes.InputElement} {...props} />; *** Take a look, this is how to decrease complexity, by using this component correctly, just pass in the attributes through the component!
			inputElement = (
				<input
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "textarea":
			inputElement = (
				<textarea
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;

		/* mapping out options, different from above, select element is different as it has more properties to manipulate */
		case "select":
			inputElement = (
				<select
					className={inputClasses.join(" ")}
					value={props.value}
					onChange={props.changed}
				>
					{/* MAP() the options for 'select' element, pretty dope */}
					{props.elementConfig.option.map((option) => {
						return (
							<option key={option.value} value={option.value}>
								{option.displayValue}
							</option>
						);
					})}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
				/>
			);
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	);
};

export default input;
