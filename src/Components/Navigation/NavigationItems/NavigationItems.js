import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

// took out 'active' in NavigationItem BurgerBuilder --> {/* for boolean values, just pass in without assigning! */}

// Do not make this into a class based component by reaching out to useState()hooks or connect(), go to where this is CALLED, layout.js

const NavigationItems = (props) => (
	/* Take note that this is a UL (unordered list) element, NavigationItem is a LI element */

	// console.log(props);

	<ul className={styles.NavigationItems}>
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
