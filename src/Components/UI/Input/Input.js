import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
    /* used to output the Input component */
    let inputElement = null;
    
    /* for error messages */
    let validationError = null;
    
    /* for css classes, originally an array so we can push error CSS classes */
	const inputClasses = [classes.InputElement];

    /* THREE props?! It is for CSS use and friendly form coloring... you don't need all tbh :D */
	if (props.invalid && props.shouldValidate && props.touch) {
        // pushes class
        inputClasses.push(classes.Invalid);
        
        // shows error if there is error
		validationError = <p className={classes.ValidationError}>Please enter a valid {props.errorMessage}</p>;
	}

	/* checking input fields for different types of input */
	switch (props.elementType) {
		case "input":
			// inputElement = <input className={classes.InputElement} {...props} />;
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

		/* mapping out options, different from above */
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
