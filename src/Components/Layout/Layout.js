import React from 'react'
import Aux from '../HOC/Aux'
import styles from './Layout.module.css'

const layout = ( { children } ) => (
    <Aux>
        <div>
            Toolbar, SideDrawer, Backdrop
        </div>
        
        {/* BurgerBuilder will be in this <main> tag */}
        <main className={styles.Content}>
            { children }
        </main>
    </Aux>
);
    
export default layout;