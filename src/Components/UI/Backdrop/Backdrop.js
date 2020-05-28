import React from 'react'
import styles from './Backdrop.module.css'

/* show = true | false */
/* decline = method */
const Backdrop = ( { show, decline } ) => (
    show ? <div onClick={decline} className={styles.Backdrop}></div> : null
);

export default Backdrop;