import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import styles from "../SideDrawer/SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../HOC/Aux";

const SideDrawer = ({ closed, show, isAuth }) => {
	let sideDrawerCSS = [styles.SideDrawer, styles.Close];
	if (show) {
		sideDrawerCSS = [styles.SideDrawer, styles.Open];
	}

	return (
		<Aux>
			<Backdrop decline={closed} show={show} />
			<div className={sideDrawerCSS.join(" ")} onClick={closed}>
				<div className={styles.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated={isAuth} />
				</nav>
			</div>
		</Aux>
	);
};

export default SideDrawer;
