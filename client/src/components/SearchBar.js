import React, { useState } from 'react'

function SearchBar (props) {
    // // const [discipline, setDiscipline] = useState('')
   
    const inputHandler = event => {
        props.setInputText(event.target.value)
    }
    // {
    //     useState(props => props.filter(user => user.discipline == inputText))
    //   };

    return (
    <div className='searchSection'>
        <p>Search</p>
        <input type="text" onChange={inputHandler}/>
    </div>
    )
}



export default SearchBar;