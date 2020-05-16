import React from 'react'
import styles from '../Modal/Modal.module.css'
import Aux from '../../HOC/Aux'
import Backdrop from '../Backdrop/Backdrop'

const Modal = ( { children, show, decline } ) => (
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

export default Modal;