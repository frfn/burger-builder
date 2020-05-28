import React from 'react'
import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

/* Strong feeling that we will come back to this class. */

const NavigationItems = () => (
    /* Take note that this is a UL element, NavigationItem is a LI element */
    <ul className={styles.NavigationItems}>
        {/* for boolean values, just pass in without assigning! */}
        <NavigationItem link="/burgerbuilder" active>Burger Builder</NavigationItem>
        <NavigationItem link="/checkout">Checkout</NavigationItem>
    </ul>
);

export default NavigationItems;