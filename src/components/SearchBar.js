import React, { useState } from 'react'

export const SearchBar = ({ setQuery, setQueryLocation }) => {
    const [queryInput, setQueryInput] = useState('')
    const [locationInput, setLocationInput] = useState('')

    function inputToQuery(event) {
        event.preventDefault()
        const inputToArray = (event.target.value).split(' ') 
        const query = inputToArray.join('%20')
        return query
    }

    function handleQueryChange(e) {
        setQueryInput(inputToQuery(e))
    }

    function handleLocationChange(e){
        setLocationInput(inputToQuery(e))
    }
    
    return (
        <div>
            <input type="text" placeholder="search by case or bike model" onChange={handleQueryChange}></input>
            <input type="text" placeholder="location" onChange={handleLocationChange}></input>
            <button onClick={() => {setQuery(queryInput); setQueryLocation(locationInput)}}>Search</button>
        </div>
    )
}

export default SearchBar