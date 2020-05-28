import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import styles from '../SideDrawer/SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../HOC/Aux'

const SideDrawer = ( { open, closed, show } ) => {

    return(
        <Aux>
            <Backdrop decline={closed} show={show} />
            <div className={styles.SideDrawer}>
                <div className={styles.Logo} >
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;  