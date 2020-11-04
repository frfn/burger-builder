import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

/* Strong feeling that we will come back to this class. */
// took out 'active' in NavigationItem BurgerBuilder

// Do not make this into a class based component by reaching out to useState()hooks or connect()

const NavigationItems = (props) => (
	/* Take note that this is a UL element, NavigationItem is a LI element */

	// console.log(props);

	<ul className={styles.NavigationItems}>
		{/* for boolean values, just pass in without assigning! */}
		<NavigationItem link="/">Burger Builder</NavigationItem>
		{/* <NavigationItem link="/checkout">Checkout</NavigationItem> */}
		{props.isAuthenticated ? (
			<NavigationItem link="/orders">Orders</NavigationItem>
		) : null}

		{props.isAuthenticated ? (
			<NavigationItem link="/logout">Logout</NavigationItem>
		) : (
			<NavigationItem link="/auth">Sign In / Register</NavigationItem>
		)}
	</ul>
);

export default NavigationItems;
