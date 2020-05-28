import React from 'react'
import BurgerLogo from '../../Assets/Images/burger-logo.png'
import styles from './Logo.module.css'

const Logo = ( { height } ) => (
    <div className={styles.Logo} style={{height: height}}>
        {/* using src='../../Assets/Images/Logo.png WILL NOT work.' */}
        <img src={BurgerLogo} alt='My Burger' />
    </div>
);

export default Logo;