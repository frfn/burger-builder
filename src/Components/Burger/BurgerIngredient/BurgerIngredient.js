import React, { Component } from 'react';
import styles from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

/* Class returns DIVS which are styled by CSS. We have studied how it works, pretty cool stuff. Check .css! */
class BurgerIngredient extends Component {
    render() {
        /* Ingredients will be JSX code, DIVs that return CSS */
        let ingredients = null;

        /* SWITCH statement, type is word that we made up... can be any name! */
        switch( this.props.type ) {
            case ( 'bread-bottom' ):
                ingredients = <div className={styles.BreadBottom}></div>;
                break;

            case ( 'bread-top' ):
                ingredients = 
                    (<div className={styles.BreadTop}>
                        <div className={styles.Seeds1}></div>
                        <div className={styles.Seeds2}></div>
                    </div>);                
                break;

            case ( 'meat' ):
                ingredients = <div className={styles.Meat}></div>;
                break;

            case ( 'cheese' ):
                ingredients = <div className={styles.Cheese}></div>;
                break;

            case ( 'salad' ):
                ingredients = <div className={styles.Salad}></div>;
                break;

            case ( 'bacon' ):
                ingredients = <div className={styles.Bacon}></div>;
                break;

            default:

        } // end of Switch

        /* Returning <div> ..<div></div>.. </div> does not work, even Aux.js doesn't work. Interesting. */
        return ( 
            /* 'ingredients' IS the <div></div> we are returning. */
            ingredients 
        );

    } // end of Render
}; // end of BurgerIngredient

/* isRequired, new to me, means that a string is required to be passed. If anything else, error! */
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;