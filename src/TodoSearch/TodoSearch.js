import React from 'react';
// import { useState } from 'react'

const TodoSearch = ({searchValue, setSearchValue}) => {

    return (
        <input placeholder="Filtrar" className="opacity-25 text-dark text-center col-9"
            value={searchValue}
            onChange={(event) => {
                setSearchValue(event.target.value)
            }}
        />
    );
}

export { TodoSearch };