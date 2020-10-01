import React, { useState } from 'react'
import '../assets/searchbar.css';

export const SearchBar = ({ setQuery, setQueryLocation, setCurrentPage }) => {
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
        <div className="searchbar-container">
            <div className="searchbar-inputs">
                <input type="text" placeholder="Search by incident or bike model" onChange={handleQueryChange}></input>
                <input type="text" placeholder="Search by location" onChange={handleLocationChange}></input>
            </div>
            <button onClick={() => {setQuery(queryInput); setQueryLocation(locationInput); setCurrentPage(1)}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 24 24" width="45">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
            </button>
        </div>
    )
}

export default SearchBar