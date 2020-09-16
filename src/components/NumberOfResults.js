import React from 'react'

const NumberOfResults = ({ results }) => {
    if(results.length === 0){
        return <h2>Oops... No results found.</h2>
    } else {
        return null
    }
    
}

export default NumberOfResults
