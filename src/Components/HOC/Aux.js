import React from 'react'

const Aux = ( { children, className } ) => {
    return(
        <div className={className}>
            {children}
        </div>
    );
}

export default Aux;