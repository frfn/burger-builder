import React from 'react'
import styles from './BuildControl.module.css'
import Aux from '../../../HOC/Aux'

const BuildControl = ({ label, less, more, disableLess, disableMore }) => (
    <Aux className={styles.BuildControl}>
        <div className={styles.Label}> { label } </div>

        {/* disabled={} is a default property that we can set on HTML button element*/}
        {/* disabled takes in a BOOLEAN VALUE. It is dynamic because it is a PROP that we are passing in it. */}
        <button onClick={less} className={styles.Less} disabled={disableLess} > Less </button>
        <button onClick={more} className={styles.More} disabled={disableMore}> More </button>
    </Aux>
);

export default BuildControl;