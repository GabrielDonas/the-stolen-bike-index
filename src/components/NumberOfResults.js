import React from 'react'

const NumberOfResults = ({ totalIncidents }) => {
    switch(totalIncidents){
        case 0:
            return <h2>Your search did not match any incident</h2>
        case 1000:
            return <h2>More than 1000 results found.</h2>
        default:
            return <h2>{totalIncidents} results found.</h2>
    }
}

export default NumberOfResults


