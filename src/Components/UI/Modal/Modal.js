import React, { Component } from 'react'
import styles from '../Modal/Modal.module.css'
import Aux from '../../HOC/Aux'
import Backdrop from '../Backdrop/Backdrop'

/* Check Recap.txt in part4 folder to review Lifecycle Methods if need be! */

class Modal extends Component {

    /* checks to see if 'show' variable (boolean value) changes, if it does, then rerender */
    shouldComponentUpdate( nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;

    }

    /* snapshot takes info from getSnapshotBeforeUpdate(prevProps, prevState) method, returns an object. Look at part4 folder, and see the classes that  */
    componentWillUpdate( prevState, prevProps, snaphot ) {
        // console.log('[Modal] will update!')
    }

    render() {

        const { children, show, decline } = this.props;

        return (
            <Aux>
                <Backdrop decline={decline} show={show}/>
                <div 
                    className={styles.Modal}
        
                    /* 
                    The style is LITERALLY how the modal is showing...
                    Without it... the modal WILL SHOW RIGHT ON TOP
                    */
                    style={{
                        /* Takes the modal UP and away */
                        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        
                        /* This controls the opacity, 0-none ... 1-full */
                        opacity: show ? '1': '0'
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