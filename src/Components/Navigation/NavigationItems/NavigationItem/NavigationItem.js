import React from "react";
import styles from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = ({ children, link, active }) => {
	// <li className={styles.NavigationItem}>
	//     <a
	//         href={ link }
	//         /* null is ok, it just doesn't pass anything. */
	//         className={ active ? styles.active : null}
	//     >{ children }</a>
	// </li>
	return (
		<li className={styles.NavigationItem}>
			<NavLink
                exact
				to={link}
				/* styles.active will be the random generated name for the class */
                activeClassName={styles.active}
				/* null is ok, it just doesn't pass anything. */
				className={active ? styles.active : null}
			>
				{children}
			</NavLink>
		</li>
	);
};

export default navigationItem;
