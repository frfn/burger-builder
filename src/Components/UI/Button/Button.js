import React from 'react';
import styles from './Button.module.css'



const Button = ( { children, click, buttonType } ) => {

    let buttonCSS = [styles.Button, styles[buttonType]];

    return (
        /* adding disabled prop */
        // disabled = {props.disabled}
        <button className={buttonCSS.join(' ')} onClick={click}>{children}</button>
    );
}

export default Button;