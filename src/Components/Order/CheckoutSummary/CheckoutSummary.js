import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
	/* Took out height: "300px", in the inline style */
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We Hope It Tastes Well!</h1>
			<div style={{ width: "100%", margin: "auto" }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button click={props.checkoutCancelled} buttonType='Danger'>
				CANCEL
			</Button>
			<Button click={props.checkoutContinued} buttonType='Success'>
				CONTINUE
			</Button>
		</div>
	);
};

export default CheckoutSummary;
