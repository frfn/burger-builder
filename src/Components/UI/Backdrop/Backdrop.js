import React from 'react'
import styles from './Backdrop.module.css'

const Backdrop = ( { show, decline } ) => (
    show ? <div onClick={decline} className={styles.Backdrop}></div> : null
);

export default Backdrop;