import React, { Component } from "react";
import styles from "../Modal/Modal.module.css";
import Aux from "../../HOC/Aux";
import Backdrop from "../Backdrop/Backdrop";

/* 
EDIT:

This has already been loaded in BurgerBuilder.js

INITIALLY IT IS FALSE IN THIS CASE, it is USED assuming that the VALUE for show is FALSE.

it already has 'state'... the component is filled WITH show prop, in BurgerBuilder, it is set to false
and it is passed to this component. 

this.props.show === false

In  regard to nextProp, if the nextProp.show value is TRUE, then thinking about that, you can compare

this.props.show !== nextProps.show

		F       !==       T        , if this is TRUE, then rerender modal.

*/

/* Check Recap.txt in part4 folder to review Lifecycle Methods if need be! */

class Modal extends Component {
	/* checks to see if 'show' variable (boolean value) changes, if it does, then rerender */
	shouldComponentUpdate(nextProps, nextState) {
		// console.log(nextProps);
		// console.log(this.props);
		return (
			nextProps.show /* new show value */ !==
				this.props.show /* previous show value */ ||
			nextProps.children !== this.props.children
		);
	}

	/* snapshot takes info from getSnapshotBeforeUpdate(prevProps, prevState) method, returns an object. Look at part4 folder, and see the classes that  */
	componentWillUpdate(prevState, prevProps, snaphot) {
		// console.log("[Modal] will update!");
	}

	render() {
		const { children, show, decline } = this.props;

		return (
			<Aux>
				{/* this shows the backdrop! that's it, a gray overlay */}
				{/* the decline is just a function that turns on and off a boolean value: true or false */}
				<Backdrop decline={decline} show={show} />
				<div
					className={styles.Modal}
					/* 
                    The style is LITERALLY how the modal is showing...
                    Without it... the modal WILL SHOW RIGHT ON TOP, tricky
                    */
					style={{
						/* Takes the modal UP and away */
						transform: show
							? "translateY(0)" // this goes middle of screen
							: "translateY(-100vh)",

						/* This controls the opacity, 0-none ... 1-full */
						opacity: show ? "1" : "0",
					}}
				>
					{children}
				</div>
			</Aux>
		);
	}
}

// you can use React.memo -- memo is the same as shouldComponentUpdate
// const Modal = ( { children, show, decline } ) => (
//     <Aux>
//         <Backdrop decline={decline} show={show}/>
//         <div
//             className={styles.Modal}

//             /*
//             The style is LITERALLY how the modal is showing...
//             Without it... the modal WILL SHOW RIGHT ON TOP
//             */
//             style={{
//                 /* Takes the modal UP and away */
//                 transform: show ? 'translateY(0)' : 'translateY(-100vh)',

//                 /* This controls the opacity, 0-none ... 1-full */
//                 opacity: show ? '1': '0'
//             }}
//         >
//             {children}
//         </div>
//     </Aux>
// );

export default Modal;
