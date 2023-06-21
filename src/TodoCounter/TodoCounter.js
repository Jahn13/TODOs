import React from 'react';
import './style.css'

const TodoCounter = ({ total, completed}) => {
    return (
        <h4 className='mt-2 text-center'>
            Has completado <span>{completed}</span> de <span>{total}</span> TODOs
        </h4>   
    );
}

export { TodoCounter };