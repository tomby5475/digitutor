import React from 'react'

function SearchBar (props) {
    const inputHandler = event => {
        props.setInputText(event.target.value)
    }

    return (
    <div className='searchSection'>
        <input placeholder='Search the discipline' type="text" onChange={inputHandler}/>
    </div>
    )
}

export default SearchBar;