import React from "react";
import styles from "../BuildControls/BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

/* Array of Objects! */
const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" },
];

/* destructure the props please.. I am going to recieve less + more */
const BuildControls = ({
	less,
	more,
	disableMore,
	disableLess,
	price,
	purchase,
	order,
	isAuth,
}) => (
	<div className={styles.BuildControls}>
		{/* toFixed() fixes the decimal values! Better than the Precision in this case! */}
		<div>
			Current Price: <strong>${Number(price).toFixed(2)}</strong>
		</div>

		{/* label + type came from controls[] */}
		{controls.map(({ label, type }) => {
			/*  */
			return (
				<BuildControl
					/* attributes passed */
					key={label}
					label={label}
					/* type={type} no need here, just pass into the less or more method, () => func() , so when it's clicked, it's fired! */

					/* methods passed - also for redux! */
					less={() => less(type)}
					more={() => more(type)}
					/* disableLess + disableMore, passes false|true value */
					disableLess={disableLess[type]}
					disableMore={disableMore[type]}
				/>
			);
		})}

		<button
			disabled={!purchase}
			className={styles.OrderButton}
			onClick={order}
		>
			{isAuth ? "ORDER NOW" : "SIGN UP"}
		</button>
	</div>
);

export default BuildControls;
