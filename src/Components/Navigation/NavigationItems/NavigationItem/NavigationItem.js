import React from "react";
import styles from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = (props) => {
	// <li className={styles.NavigationItem}>
	//     <a
	//         href={ link }
	//         /* null is ok, it just doesn't pass anything. */
	//         className={ active ? styles.active : null}
	//     >{ children }</a>
	// </li>

	// console.log(props);

	return (
		<li className={styles.NavigationItem}>
			{/* 
			by using EXACT, TO, and ACTIVECLASSNAME -- exact will only style the to="/routeLoc" and activeClassName styles!
			- so when on "/" route, only Burger Builder will be styled,
			- on "/auth" route, only Sign In will be styled
			
			It is based on the route!
			*/}
			<NavLink
				// comment out exact, className, activeClassName, this is how the nav items are changing and staying!
				exact /* when true, the style will be applied if the location is correct */
				to={props.link}
				/* styles.active will be the random generated name for the class */
				activeClassName={styles.active} // OH activeClassName is implemented!
				/* null is ok, it just doesn't pass anything. */
				// className={props.active ? styles.active : null}
			>
				{props.children}
			</NavLink>
		</li>
	);
};

export default navigationItem;
