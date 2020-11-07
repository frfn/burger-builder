import React from "react";
import styles from "../DrawerToggle/DrawerToggle.module.css";

const drawerToggle = ({ drawerToggleClicked }) => (
	/* just a div, when you click on the DIV, toggle boolean value to true, shows side drawer */
	<div className={styles.DrawerToggle} onClick={drawerToggleClicked}>
		{/* these DIVS are just lines for the side drawer icon on the toolbar, ADD MORE to see what it does */}
		<div></div>
		<div></div>
		<hr></hr>
		<div></div>
		<div></div>
	</div>
);

export default drawerToggle;
