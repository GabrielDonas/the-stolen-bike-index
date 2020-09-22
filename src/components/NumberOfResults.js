import React from 'react'

const NumberOfResults = ({ results, totalIncidents }) => {
    if(results.length === 0){
        return <h2>Oops... No results found.</h2>
    } else if(totalIncidents === 1000){
        return <h2>More than 1000 results found.</h2>
    } else {
        return <h2>{totalIncidents} results found.</h2>
    }
}

export default NumberOfResults
