import React from 'react'
import styles from '../../Navigation/Toolbar/Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const Toolbar = () => {

    return (
        /* header are just DIVS */
        /* these are called semantic HTML elements */
        <header className={styles.Toolbar}>
            <div>MENU</div>

            <div className={styles.Logo}>
                <Logo />
            </div>

            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default Toolbar;