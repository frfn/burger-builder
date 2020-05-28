import React from 'react'
import styles from '../../Navigation/Toolbar/Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = ( { drawerToggleClicked } ) => {

    /* This is the top of App, where the | Menu   Logo   Links | are */

    return (
        /* header are just DIVS */
        /* these are called semantic HTML elements */
        <header className={styles.Toolbar}>
           <DrawerToggle 
                drawerToggleClicked={drawerToggleClicked}
           />

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