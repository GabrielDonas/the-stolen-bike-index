import React, { useState } from 'react'

export const SearchBar = ({ setQuery, setQueryLocation }) => {
    const [queryInput, setQueryInput] = useState('')
    const [locationInput, setLocationInput] = useState('')


    function handleQueryChange(e) {
        e.preventDefault()
        const inputArray = (e.target.value).split(' ') 
        const query = inputArray.join('%20')
        setQueryInput(query)
    }

    function handleLocationChange(e){
        e.preventDefault()
        const inputArray = (e.target.value).split(' ') 
        const query = inputArray.join('%20')
        setLocationInput('&proximity=' + query)
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